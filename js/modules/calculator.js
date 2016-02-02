Box.Application.addModule('calculator',function(context){
	'use strict';
	var moduleElement,utilities,table,exp,calculatorScreen,calculated;
	return{
		init:function(){
			moduleElement=context.getElement();
			utilities=context.getService('utilities');
			$("#view-title").text("Calculator");
			table=[9,8,7,6,5,4,3,2,1,'+',0,'-','/','=','*','.','C','CE'];
			this.createCalculator();
			exp="";
			calculated=false;
		},
		createCalculator:function(){
			var div=utilities.createElement("div",null,null,"calculator-div");
			calculatorScreen=utilities.createElement("textarea",null,null,"calculator-screen");
			$(calculatorScreen).attr("readonly",true);
			$(div).append(calculatorScreen);
			// console.log(table);
			for(var key in table){
				var button=utilities.createElement("button",table[key],null,"calculator-buttons",table[key]);
				$(div).append(button);
			}
			$(moduleElement).append(div);
		},
		evaluateExpression:function(){
			var ans;
			try{
				// ans=eval("this.createCalculator()");
				ans=eval(exp);
				$(calculatorScreen).val(ans);
				exp=ans;
				calculated=true;
			}
			catch(e){
				$(calculatorScreen).val("Invalid Expression");
				window.setTimeout(function(){
					$(calculatorScreen).val(exp);
				},1000);
			}
		},
		deletePrevious:function(){
			if(calculated){
				this.deleteAll();
			}
			else{
				exp=exp.slice(0,-1);
			}
			$(calculatorScreen).val(exp);
		},
		deleteAll:function(){
			exp="";
			calculated=false;
			$(calculatorScreen).val(exp);
		},
		addToExpression:function(key){
			if(key=='/' || key=='*' || key=='+' || key=='-'){
				exp+=key;
			}
			else{
				if(!calculated)
					exp+=key;
				else{
					exp=key;
				}
			}
			$(calculatorScreen).val(exp);
			calculated=false;
		},
		onclick:function(event,element,elementType){
			if(elementType=="="){
				this.evaluateExpression();
			}
			else if(elementType=="C"){
				this.deletePrevious();
			}
			else if(elementType=="CE"){
				this.deleteAll();
			}
			else if(elementType!="")
				this.addToExpression(elementType);
		},
		destroy:function(){
			$(moduleElement).text("");
			$("#view-title").text("Choose an option from menu");
			moduleElement=null;
			exp=null;
			calculated=null;
			utilities=null;
			table=null;
			calculatorScreen=null;
		}
	};
});