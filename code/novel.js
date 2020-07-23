
            function novel(nember){
                document.body.style.textAlign='center';
                var ifrproxy = document.createElement('iframe');  
                ifrproxy.src=`https://www.wenku8.net/novel/2/${nember}/index.htm`;
                ifrproxy.height=document.documentElement.scrollHeight-30;
                ifrproxy.width =document.documentElement.clientWidth -20;

                ifrproxy.style.margin = '0 auto';
                ifrproxy.style.border = '0px';

                document.body.appendChild(ifrproxy);
            }