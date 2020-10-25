/*
 * version 0.2
 * acthor wujunkai
 * mail wu.junkai@qq.com
 */
function print(x){console.log(x);}

class element{
	constructor(root){this.root=root;}
	add(TagName,inner,other={}){
		if(!TagName)return this.text(inner);
		var object = document.createElement(TagName);
		object.innerText = inner;
		for(var key in other)object[key]=other[key];
		this.root.appendChild(object);
		return new element(object);
	};
	text(inner){this.root.innerHTML=this.root.innerHTML+inner;}
};
var head = new element(document.head);var body = new element(document.body);var article = null

function title(at,text){
	title={"h6":/^\s{0,}#{6}\s.+/,"h5":/^\s{0,}#{5}\s.+/,"h4":/^\s{0,}#{4}\s.+/,"h3":/^\s{0,}#{3}\s.+/,"h2":/^\s{0,}#{2}\s.+/,"h1":/^\s{0,}#{1}\s.+/};
	for(var key in title)if(title[key].test(text[at])){
		if(!document.title)document.title=text[at].replace(/^\s{0,}#{1,6}\s/,'');
		article.add(key,text[at].replace(/^\s{0,}#{1,6}\s/,''));
		return 1;
	}
}
function commen(at,text){
	article.add("",text[at].replace(/\s{2}/,"</br>"));
	return 1;
}
function link(at,text){
	var href=/\[.+?\]\s{0,}?\(.+?\)/,str=text[at];
	while(href.test(str)){
		var get=href.exec(str)[0];
		var inner=/(?<=\[).+?(?=\])/.exec(get)[0],links=/(?<=\().+?(?=\))/.exec(get)[0];
		str=str.replace(get,`<a href="${links}" rel="nofollow">${inner}</a>`);
	}
	article.add('',str);
	return 1;
}
function image(at,text){
	var src=/!\s{0,}?\[.{0,}?\]\s{0,}?\(.+?\)/,str=text[at];
	while(src.test(str)){
		var get=src.exec(str)[0];
		var inner=/(?<=\[).{0,}?(?=\])/.exec(get)[0],links=/(?<=\().+?(?=\))/.exec(get)[0];
		if(inner)str=str.replace(get,`<img href="${links}" alt="${inner} " style="max-width:100%;"/>`);
		else str=str.replace(get,`<img src="${links}" style="max-width:100%;"/>`);
	}
	article.add('',str);
	return 1;
}

(async function()
{
	// set , get and clear
	head.add("link","",{"media":"all","rel":"stylesheet","href":"https://cdn.jsdelivr.net/gh/WuJunkai2004/WuJunkai2004.github.io@master/style/markdown.css"});
	var text = document.body.innerHTML.split('\n');
	document.body.innerText="";
	// Error : itemprop is not a item
	article = body.add("article","",{"className":"markdown-body entry-content container-lg","itemprop":"text"});
	// set the regular expression
	regular=[{"str":/^\s{0,}#{1,6}\s.+/,"function":title},
		 {"str":/!\s{0,}?\[.{0,}?\]\s{0,}?\(.+?\)/,"function":image},
		 {"str":/\[.+?\]\s{0,}?\(.+?\)/,"function":link},
		 {"str":/.{0,}/,"function":commen}]
	// range the lines and set the element
	for(var i=0;i<text.length;)for(var patt=0;patt<regular.length;patt++)if(regular[patt].str.test(text[i])){
		i+=regular[patt].function(i,text);
		break;
	}
})();
