Box.Application.addModule('sidebar-menu',function(context){
	'use strict';
	var db,moduleElement,moduleToStart,modules,accounts,categories,transactions;
	return{
		messages:['startModule'],
		init:function(){
			$("#view-title").text("Choose an option from menu");
			modules=document.getElementById('content');
			db=context.getService('db');
			accounts=db.getData('accounts');
			categories=db.getData('categories');
			transactions=db.getData('transactions');
			$("#account-selected").text(accounts.data[0].name);
			moduleElement=context.getElement();
			// $("#view-title").text("Add new Category");
		},
		startModule:function(moduleName){
			if(moduleToStart){
				Box.Application.stopAll(modules);
				moduleToStart.removeAttribute('data-module');
				moduleToStart.removeAttribute("class");
			}
			moduleToStart=document.querySelector('[data-module-name="'+moduleName+'"]');
			moduleToStart.setAttribute('data-module',moduleName);
			moduleToStart.setAttribute("class","show");
			Box.Application.startAll(modules);
		},
		onclick:function(event,element,elementType){
			if(elementType!=""){
				context.broadcast('startModule',elementType);
			}
		},
		onmessage:function(message,data){
			if(message=='startModule'){
				this.startModule(data);
			}
		},
		destroy:function(){
			db=null;
			moduleElement=null;
			modules=null;
			accounts=null;
			categories=null;
			transactions=null;
			moduleToStart=null;
		}
	};
});