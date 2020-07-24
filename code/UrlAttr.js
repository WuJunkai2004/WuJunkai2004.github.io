function GetUrlAttr()
{
    var attr=window.location.search.substring(1);
    attrs=new Array()
    attr=attr.split('&');
    for(var i=0;i<attr.length;i++){
        var temp=attr[i].split('=');
        attrs[temp[0]]=temp[1];
    }
    return attrs
}