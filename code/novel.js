function novel(nember){
    function load(ifrproxy,id){
        document.body.style.textAlign='center';
        ifrproxy.src=`https://www.wenku8.net/novel/2/${id}/index.htm`;

        self_adaption(ifrproxy);

        ifrproxy.style.margin = '0 auto';
        ifrproxy.style.border = '0px';

        document.body.appendChild(ifrproxy);
    }
    function self_adaption(ifrproxy)
    {
        ifrproxy.height=document.documentElement.clientHeight-10;
        ifrproxy.width =document.documentElement.clientWidth -10;
    }
    var ifrproxy = document.createElement('iframe');
    load(ifrproxy,nember);
    window.onblur=function(){
        setTimeout(function(){self_adaption(ifrproxy)},125);
    }
}