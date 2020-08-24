function debug(attr='')
{
    //if no attr
    if(attr=='')
        return false;
    //change string into dictionary
    attrs=new Array()
    attr=attr.split('&');
    for(var i=0;i<attr.length;i++){
        var temp=attr[i].split('=');
        attrs[temp[0]]=temp[1];
    }
    delete attr
    //if there are no debug
    if(attrs.debug!='true')
        return
    //debugging
    if(attrs.div)
        for(var i=0;i<document.getElementsByTagName("div").length;i++)
            document.getElementsByTagName("div")[i].style.border=`${attrs.div}px solid #F00`
}
function environment(path)
{
    var links=document.head.getElementsByTagName('link');
    for(var i=0;i<links.length;i++){
        console.log(links[i].split);
    }
}
