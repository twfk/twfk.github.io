/*ui-search 定义*/
$.fn.UiSearch = function(){
	var ui = $(this);

	$('.ui-search-selected',ui).on('click',function(){
		//debugger;
		$('.ui-search-select-list').show();
		return false;
	});
	$('.ui-search-select-list a',ui).on('click',function(){
		//debugger;
		$('.ui-search-selected').text($(this).text());
		$('.ui-search-select-list').hide();
		return false;
	});

	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
	});
}
/*UI tab 规则*/
/**
 *@param {string} header TAB组件的选项卡切换部分className
 *@contet 内容区域
 *@focus_prefix 选中
 */
$.fn.UiTab = function(header,content,focus_prefix){
	var ui = $(this);
	var tabs = $(header,ui);
	var cons = $(content,ui); 
	var focus_prefix = focus_prefix || '';

	tabs.on('click' ,function(){
		var index =$(this).index();
		console.log(index);
		tabs.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+'item_focus');	
		cons.hide().eq(index).show();
		return false;
	}
		);
};

/*ui-backtop*/
$.fn.UiBackTop = function(){
	var ui = $(this);
	var el = $('<a class="ui-backtop" href="#0"></a>');
	ui.append(el);
	var windowHeight = $(window).height();

	$(window).on('scroll',function(){
		var top = $('html,body').scrollTop()/*document.documentElement.scrollTop*/;
		console.log('top-'+top);
		console.log('windowHeight-'+windowHeight);
		if(top > windowHeight/2){
			el.show();
		}
		else{
			el.hide();
		}
	});
	el.on('click',function(){
		$(window).scrollTop(0);
	});
};

/*UI slider 1,箭头 2，翻页 3进度点 4自动滚动*/
$.fn.UiSlider = function(){
	var ui = $(this);
	var wrap = $('.ui-slider-wrap');
	var item = $('.ui-slider-wrap .item',ui);
	var btn_prev =$('.ui-slider-arrow .left',ui);
	var btn_next = $('.ui-slider-arrow .right',ui);
	var tips = $('.ui-slider-process .item',ui); 

	var current=0;
	var size =item.size();
	var width=item.eq(0).width();
	var enableAuto = true;

	wrap.on('mouseover',function(){
		enableAuto = false;
	});

	wrap.on('mouseout',function(){
		enableAuto = true;
	});

	wrap.on('move_prev', function(){
		if(current<=0){
			current=size;
		}
		current = current -1;
		wrap.triggerHandler('move_to',current);
	})
	.on('move_next', function(){
		if(current>=size-1){
			current=-1;
		}
		current = current +1;
		wrap.triggerHandler('move_to',current)
	})
	.on('move_to', function(evt,index){
		wrap.css('left',index*width*-1);
		tips.removeClass('item_focus').eq(index).addClass('item_focus');
	})
	.on('autoMove',function(){
		setInterval(function(){
			enableAuto && wrap.triggerHandler('move_next');
		},1000);
	})
	.triggerHandler('autoMove');


	//事件操作
	btn_prev.on('click',function(){
			wrap.triggerHandler('move_prev');
	});

	btn_next.on('click',function(){
			wrap.triggerHandler('move_next');
	});

	tips.on('click',function(){
		var index= $(this).index();
		wrap.triggerHandler('move_to',index);
	});
}

/*页面的脚本逻辑*/
$(function(){
	$('.ui-search').UiSearch();
	$('.content-tab').UiTab('.caption > .item','.block > .item');
	$('.content-tab .block .item').UiTab('.block-caption > a', '.block-content > .block-wrap','block-caption-');
	$('body').UiBackTop();
	$('.ui-slider').UiSlider();
});