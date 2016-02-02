Box.Application.addModule('sidebar-menu',function(context){
	'use strict';
	var db,moduleElement,moduleToStart,modules,accounts,categories,transactions;
	return{
		init:function(){
			modules=document.getElementById('content');
			// Box.Application.startAll(modules);
			// Box.Application.stopAll(modules);
			db=context.getService('db');
			accounts=db.getData('accounts');
			categories=db.getData('categories');
			transactions=db.getData('transactions');
			$("#account-selected").text(accounts.data[0].name);
			moduleElement=context.getElement();
			// $("#view-title").text("Add new Category");
		},
		onclick:function(event,element,elementType){
			if(elementType!=""){
				if(moduleToStart){
					// console.log(moduleToStart);
					Box.Application.stop(moduleToStart);
					moduleToStart.removeAttribute("class");
				}
				else{
					Box.Application.stopAll(modules);
				}
				moduleToStart=document.querySelector('[data-module="'+elementType+'"]');
				moduleToStart.setAttribute("class","show");
				// console.log(moduleToStart);
				Box.Application.start(moduleToStart);
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