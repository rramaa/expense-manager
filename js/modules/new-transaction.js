Box.Application.addModule('new-transaction',function(context){
	'use strict';
	var Transaction=function(id,type,category,amount,description,timestamp){
		this.id=id;
		this.type=type;
		this.category=category;
		this.amount=amount;
		this.description=description;
		this.timestamp=timestamp;
	};
	var moduleElement,utilities,db,transactions,category,type,currentAccount;
	return{
		init:function(){
			moduleElement=context.getElement();
			utilities=context.getService('utilities');
			db=context.getService('db');
			transactions=db.getData('transactions');
			// categories=db.getData('categories');
			this.createNewTransaction();
			$("#view-title").text("New Transaction");
			currentAccount=0;
			// console.log(context.setGlobalConfig('currentAccount',1));
			console.log(context.getGlobalConfig('currentAccount'));
			// transactions[currentAccount][day]=new Transaction(0,'-1','Misc',null,"Test",time);
			// console.log(transactions);
		},
		createNewTransaction:function(){
			// type,category,mode,description,submit
			var div=utilities.createElement('div',null,null,'new-transaction-div');
			var text=utilities.createElement('span','Expense/Income:');
			$(div).append(text);
			var elem=utilities.createDropdownElement('type');
			$(div).append(elem);
			$(div).append($('<br>'));
			var text=utilities.createElement('span','Category:');
			$(div).append(text);
			var elem=utilities.createDropdownElement('category');
			$(div).append(elem);
			$(div).append($('<br>'));
			var text=utilities.createElement('span','Amount: ');
			$(div).append(text);
			var elem=utilities.createElement('input',null,null,null,"input-amount");
			$(div).append(elem);
			$(div).append($('<br>'));
			var text=utilities.createElement('span','Description:');
			$(div).append(text);
			var elem=utilities.createElement('textarea',null,null,null,'input-description');
			$(div).append(elem);
			$(div).append($('<br>'));
			var elem=utilities.createElement('button',"Submit",null,null,'btn-submit-transaction');
			$(div).append(elem);
			$(moduleElement).append(div);
			console.log($(moduleElement));
		},
		addTransaction:function(){
			var amount=moduleElement.querySelector('[data-type="input-amount"]');
			if(amount.value=="" || !(category) || !(type))
				return;
			var description=moduleElement.querySelector('[data-type="input-description"]');
			var day=utilities.getCurrentDateCode();
			var time=utilities.getCurrentTimeCode();
			if(!transactions[currentAccount][day])
				transactions[currentAccount][day]=[];
			transactions[currentAccount][day].push(new Transaction(transactions.count,type,category,amount.value,description.value,time));
			transactions.count++;
			console.log(transactions);
			amount.value=description.value="";
			db.setData('transactions',transactions);
		},
		onclick:function(event,element,elementType){
			if(parseInt(elementType) || elementType==='0'){
				var parent=element.parentNode.parentNode.parentNode;
				if(parent.getAttribute('data-type')=='select-type'){
					type=elementType;
					parent.childNodes[0].innerHTML=element.innerHTML+"<span class=caret></span>";
				}
				else if(parent.getAttribute('data-type')=='select-category'){
					category=elementType;
					parent.childNodes[0].innerHTML=element.innerHTML+"<span class=caret></span>";
				}
			}
			else if(elementType=='btn-submit-transaction'){
				this.addTransaction();
			}
		},
		onkeydown:function(event,element,elementType){
			if(elementType=="input-amount"){
				console.log(event.keyCode);
				if(!((event.keyCode>=48 && event.keyCode<=57)||event.keyCode==190||event.keyCode==9))
					event.preventDefault();
			}
		},
		destroy:function(){
			$(moduleElement).text("");
			moduleElement=null;
			utilities=null;
			db=null;
			transactions=null;
			// categories=null;
			$("#view-title").text("Choose an option from menu");
		}
	};
});