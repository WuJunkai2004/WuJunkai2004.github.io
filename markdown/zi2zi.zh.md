# zi2zi: 使用条件对抗网络(Conditional Adversarial Networks)掌握中国书法

<p align="center">
<img src="https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/intro.gif"/>
</p>

## 介绍
zi2zi(字到字, 意思是将一种文字转化为另一种文字) 使用 GAN 学习东亚文字的字体，是最近流行的 [pix2pix](https://github.com/phillipi/pix2pix) 模型在汉字中的应用和扩展。

详细内容可以在这篇[**博客**](https://kaonashi-tyc.github.io/2017/04/06/zi2zi.html)中找到。

## 神经网络结构
### 原始模型
![alt network](https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/network.png)

这个神经网络结构基于 pix2pix 。同时添加了 category embedding 和两种 loss —— category loss 和 constant loss ，分别来自 [AC-GAN](https://arxiv.org/abs/1610.09585) 和 [DTN](https://arxiv.org/abs/1611.02200)。  
> The network structure is based off pix2pix with the addition of category embedding and two other losses, category loss and constant loss, from [AC-GAN](https://arxiv.org/abs/1610.09585) and [DTN](https://arxiv.org/abs/1611.02200) respectively.

### 使用 Label Shuffling 更新模型

![alt network](https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/network_v2.png)

After sufficient training, **d_loss** will drop to near zero, and the model's performance plateaued. **Label Shuffling** mitigate this problem by presenting new challenges to the model. 

Specifically, within a given minibatch, for the same set of source characters, we generate two sets of target characters: one with correct embedding labels, the other with the shuffled labels. The shuffled set likely will not have the corresponding target images to compute **L1\_Loss**, but can be used as a good source for all other losses, forcing the model to further generalize beyond the limited set of provided examples. Empirically, label shuffling improves the model's generalization on unseen data with better details, and decrease the required number of characters.

You can enable label shuffling by setting **flip_labels=1** option in **train.py** script. It is recommended that you enable this after **d_loss** flatlines around zero, for further tuning.

## 画廊
### Compare with Ground Truth

<p align="center">
<img src="https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/compare3.png" alt="compare" width="600"/>
</p>

### Brush Writing Fonts
<p align="center">
<img src="https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/cj_mix.png" alt="brush"  width="600"/>
</p>

### Cursive Script (Requested by SNS audience)
<p align="center">
<img src="https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/cursive.png" alt="cursive"  width="600"/>
</p>


### Mingchao Style (宋体/明朝体)
<p align="center">
<img src="https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/mingchao4.png" alt="gaussian"  width="600"/>
</p>

### Korean
<p align="center">
<img src="https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/kr_mix_v2.png" alt="korean"  width="600"/>
</p>

### Interpolation
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/transition.png" alt="animation",  width="600"/>
</p>

### Animation
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/poem.gif" alt="animation",  width="250"/>
  <img src="https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/ko_wiki.gif" alt="animation", width="250"/>
</p>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/kaonashi-tyc/zi2zi@master/assets/reddit_bonus_humor_easter_egg.gif" alt="easter egg"  width="300"/>
</p>


## How to Use
### Step Zero
Download tons of fonts as you please
### Requirement
* Python 2.7
* CUDA
* cudnn
* Tensorflow >= 1.0.1
* Pillow(PIL)
* numpy >= 1.12.1
* scipy >= 0.18.1
* imageio

### Preprocess
To avoid IO bottleneck, preprocessing is necessary to pickle your data into binary and persist in memory during training.

First run the below command to get the font images:

```sh
python font2img.py --src_font=src.ttf
                   --dst_font=tgt.otf
                   --charset=CN 
                   --sample_count=1000
                   --sample_dir=dir
                   --label=0
                   --filter=1
                   --shuffle=1
```
Four default charsets are offered: CN, CN_T(traditional), JP, KR. You can also point it to a one line file, it will generate the images of the characters in it. Note, **filter** option is highly recommended, it will pre sample some characters and filter all the images that have the same hash, usually indicating that character is missing. **label** indicating index in the category embeddings that this font associated with, default to 0.

After obtaining all images, run **package.py** to pickle the images and their corresponding labels into binary format:

```sh
python package.py --dir=image_directories
                  --save_dir=binary_save_directory
                  --split_ratio=[0,1]
```

After running this, you will find two objects **train.obj** and **val.obj** under the save_dir for training and validation, respectively.

### Experiment Layout
```
experiment/
└── data
    ├── train.obj
    └── val.obj
```
Create a **experiment** directory under the root of the project, and a data directory within it to place the two binaries. Assuming a directory layout enforce bettet data isolation, especially if you have multiple experiments running.
### Train
To start training run the following command

```sh
python train.py --experiment_dir=experiment 
                --experiment_id=0
                --batch_size=16 
                --lr=0.001
                --epoch=40 
                --sample_steps=50 
                --schedule=20 
                --L1_penalty=100 
                --Lconst_penalty=15
```
**schedule** here means in between how many epochs, the learning rate will decay by half. The train command will create **sample,logs,checkpoint** directory under **experiment_dir** if non-existed, where you can check and manage the progress of your training.

### Infer and Interpolate
After training is done, run the below command to infer test data:

```sh
python infer.py --model_dir=checkpoint_dir/ 
                --batch_size=16 
                --source_obj=binary_obj_path 
                --embedding_ids=label[s] of the font, separate by comma
                --save_dir=save_dir/
```

Also you can do interpolation with this command:

```sh
python infer.py --model_dir= checkpoint_dir/ 
                --batch_size=10
                --source_obj=obj_path 
                --embedding_ids=label[s] of the font, separate by comma
                --save_dir=frames/ 
                --output_gif=gif_path 
                --interpolate=1 
                --steps=10
                --uroboros=1
```

It will run through all the pairs of fonts specified in embedding_ids and interpolate the number of steps as specified. 

### Pretrained Model
Pretained model can be downloaded [here](https://drive.google.com/open?id=0Bz6mX0EGe2ZuNEFSNWpTQkxPM2c) which is trained with 27 fonts, only generator is saved to reduce the model size. You can use encoder in the this pretrained model to accelerate the training process.
## Acknowledgements
Code derived and rehashed from:

* [pix2pix-tensorflow](https://github.com/yenchenlin/pix2pix-tensorflow) by [yenchenlin](https://github.com/yenchenlin)
* [Domain Transfer Network](https://github.com/yunjey/domain-transfer-network) by [yunjey](https://github.com/yunjey)
* [ac-gan](https://github.com/buriburisuri/ac-gan) by [buriburisuri](https://github.com/buriburisuri)
* [dc-gan](https://github.com/carpedm20/DCGAN-tensorflow) by [carpedm20](https://github.com/carpedm20)
* [origianl pix2pix torch code](https://github.com/phillipi/pix2pix) by [phillipi](https://github.com/phillipi)

## License
Apache 2.0

## Other
翻译者 ：[Wu Junkai](https://github.com/WuJunkai2004/)  
这篇README是我在未经许可的情况下翻译的，[原文](https://github.com/kaonashi-tyc/zi2zi/blob/master/README.md)在这里。  
翻译者还仅是个学生，文笔拙劣。部分翻译为节省工作量，使用机翻。若有翻译错误或翻译不到位的地方，请谅解。  
图片使用[jsDelivr](https://www.jsdelivr.com/)进行加速显示。  
