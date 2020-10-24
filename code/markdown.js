/*
 * version 0.1
 * acthor wujunkai
 * mail wu.junkai@qq.com
 */
function print(x){console.log(x);}

class element{
	constructor(tag){this.root=document[tag];}
	add(TagName,inner,other={}){
		if(!document[this.tag])
			return;
		var object = document.createElement(TagName);
		object.innerText = inner;
		for(var key in other)
			object[key]=other[key];
		root.appendChild(object);
	};
	set()
};head = new element("head");body = new element("body");

function title(at,text)
{
	
}

(async function()
{
	// set , get and clear
	head.add("link","",{"crossorigin":"anonymous","media":"all","integrity":"sha512-AAL4vHqoef7azLizL9Sh/ph6rt7hPyPXoa6ngQSxoJI8jZPIL5Ij17nCUW124lalllAaZqoThwv4iFO6e0ol3g==","rel":"stylesheet","href":"https://github.githubassets.com/assets/frameworks-0002f8bc7aa879fedaccb8b32fd4a1fe.css"});
	head.add("link","",{"crossorigin":"anonymous","media":"all","integrity":"sha512-VtAH+ujKQfsjrCw/OuS8YAyEd+o8OZdzBT3P116XooG48uEFJWJBdaQDK2EZie+EbyE+rzrS4uejAEDqiI189g==","rel":"stylesheet","href":"https://github.githubassets.com/assets/github-56d007fae8ca41fb23ac2c3f3ae4bc60.css"})
	var text = document.body.innerHTML.split('\n');
	document.body.innerText="";
	// set the regular expression
	regular=[
		{"str":/^\s{0,}#{1,6}\s.+/,"function":title}
	]
	// range the lines and set the element
	/*
	for(var i=0;i<text.length;){
		for(var patt=0;patt<1;patt++){
			if(regular[patt].str.test(text[i]))
				i+=regular[patt].function(i,text)
		}
	}*/
	
}
)();


