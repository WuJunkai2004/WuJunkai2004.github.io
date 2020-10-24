/*
 * version 0.1
 * acthor wujunkai
 * mail wu.junkai@qq.com
 */
function print(x){console.log(x);}

class element{
	constructor(tag=""){if(tag)this.root=document[tag];}
	add(TagName,inner,other={}){
		if(!TagName)
			return this.text(inner);
		var object = document.createElement(TagName);
		object.innerText = inner;
		for(var key in other)object[key]=other[key];
		object["class"]="markdown-body entry-content container-lg";
		this.root.appendChild(object);
		print(object);
		var elements = new element();
		elements.set(object);
		return elements;
	};
	text(inner){this.root.innerHTML=this.root.innerHTML+inner;}
	set(root){this.root=root}
};head = new element("head");body = new element("body");article=new element();

function title(at,text){
	title={"h6":/^\s{0,}#{6}\s.+/,"h5":/^\s{0,}#{5}\s.+/,"h4":/^\s{0,}#{4}\s.+/,"h3":/^\s{0,}#{3}\s.+/,"h2":/^\s{0,}#{2}\s.+/,"h1":/^\s{0,}#{1}\s.+/};
	for(var key in title)if(title[key].test(text[at])){
		if(!document.title)document.title=text[at].replace(/^\s{0,}#{1,6}\s/,'');
		article.add(key,text[at].replace(/^\s{0,}#{1,6}\s/,''));
		break;
	}
	return 1;
}
function commen(at,text){article.add("",text[at].replace(/\s{2}/,"</br>"));return 1;}
function script(at,text){return 1;}

(async function()
{
	// set , get and clear
	head.add("link","",{"media":"all","rel":"stylesheet","href":"https://cdn.jsdelivr.net/gh/WuJunkai2004/WuJunkai2004.github.io@master/style/markdown.css"});
	var text = document.body.innerHTML.split('\n');
	document.body.innerText="";
	// set the regular expression
	regular=[{"str":/^\s{0,}#{1,6}\s.+/,"function":title},
		 {"str":/<script.+script>/,"function":script},
		 {"str":/.+/,"function":commen}]
	// Error : itemprop is not a item
	article = body.add("article","",{"className":"markdown-body entry-content container-lg","itemprop":"text"});
	// range the lines and set the element
	var done=false;
	for(var i=0;i<text.length;){
		done=false;
		for(var patt=0;patt<3;patt++)
			if(regular[patt].str.test(text[i])){
				done=true;
				i+=regular[patt].function(i,text);
				break;
			}
		if(done==false){
			print("Error "+text[i]);
			i++;
		}
	}
})();
