(function noDebuger(){function testDebuger(){var wWADWeTEd1=new window["Date"]();debugger;if(new window["Date"]()-wWADWeTEd1>10){window.document.body.innerHTML=null;return true}return false}function start(){while(testDebuger()){testDebuger()}}if(!testDebuger()){window.onblur=function(){setTimeout(function(){start()},500)}}else{start()}})();