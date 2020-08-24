function sleep(ms)
{
    return new Promise( function(resolve, reject){
        setTimeout(
            function(){resolve();},
            ms
        );
    });
}

function background()
{
    if(document.getElementsByClassName("background_image").length==1)
        return document.getElementsByClassName("background_image")[0];

    var link=document.createElement("link");
    link.rel="stylesheet";
    link.href="https://cdn.jsdelivr.net/gh/WuJunkai2004/WuJunkai2004.github.io@master/style/background.css";
    link.type="text/css";
    document.getElementsByTagName('head')[0].appendChild(link);

    var canvas=document.createElement('div');
    canvas.className="background_image";
    document.getElementsByTagName('body')[0].appendChild(canvas);

    return background();
}

async function change_back_image(images,seconds=10)
{
    var back=background();
    back.style.backgroundImage=`url("${images[images.length-1]}")`;

    var num=0;
    while(true){
        if(num==images.length)
            num=0;

        for(var i=100;i>=0;i-=1){
            back.style.opacity=i/100.0;
            await sleep(seconds*5);
        }

        back.style.backgroundImage=`url("${images[num]}")`

        for(var i=0;i<=100;i+=1){
            back.style.opacity=i/100.0;
            await sleep(seconds*5);
        }
        console.log(num)

        num+=1;
    }
}