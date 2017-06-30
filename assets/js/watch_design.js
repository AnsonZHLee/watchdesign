/*******
 *
 * Watch Design V0.3.1
 * Author: Anson ZHLee <cj8694u06@gmail.com>
 * https://github.com/AnsonZHLee/watch_design
 *
 *******/

(function($){
if( screen.width>1024 ){
    var menuLock = true;
    var _$section = $('section');
    var _$iframe = $('iframe');
    var _$iframeName = $('iframe').attr('name');
    var _$article = $('article');
    var _$aside = $('aside');
    var _$asideA = $('aside ul li a');
    var _$panelOC = $('.panel_c, .panel_o');
    var _$panelBtn = $('a[class^=btn]');
    var _tmpSize = ['btn_small','btn_middle','btn_normal'];
    var _$stepDefault = $('#stepDefault');
    var _$stepDesign = $('#stepDesign');
    var _$stepLayout = $('#stepLayout');

    function oplock(){
		menuLock = false;
		_$iframe.css({'background':'none', 'height':'100%'});
		_$article.css({'overflow-y':'hidden'});
	}

	$(function(){
		_$stepDesign.find('ul a').each(function(){
			$(this).click(function(){
				let tmpSize = {mobile:'btn_small',pad:'btn_middle',screen:'btn_normal'};
				let src = $(this).attr('data-src');
				let stage = tmpSize[$(this).attr('data-stage')]?tmpSize[$(this).attr('data-stage')]:tmpSize['screen'];
				if(src){
					setImg(src,stage);
				}
			});
		});

		_$stepDefault.find('a').each(function(){
			$(this).attr('target',_$iframeName);
			$(this).click(function(){
				_$iframe.attr('src', $(this).attr('data-src'));
				setImg(null,null,true);
			});
		});

		_$stepLayout.find('a').each(function(){
			$(this).attr('target',_$iframeName);
			$(this).click(function(){
				_$iframe.attr('src', $(this).attr('data-src'));
				oplock();
			});
		});

		_$panelBtn.click(function(){
			if(menuLock)return;
			setScrn($(this).attr('class'));
		});

		_$panelOC.click(function(){
			_$section.toggleClass('panelUp');

			let sourceSet = (_$article.hasClass('tmp_small')?_tmpSize[0]:_$article.hasClass('tmp_middle')?_tmpSize[1]:null);
			let url = _$iframe.css('background-image').replace('url', '').replace('(', '').replace(')', '').replace('"', '').replace('"', '');

			_$aside.toggle('slide', function(){setImg(url!='none'?url:null,sourceSet,menuLock);});
		});

		_$asideA.click(function(){
			var self = this;
			var papa = getAncestor(self);

			_$aside.find('ul li.thispage').each((function(self){
				return function(){
					if($(this).find('>a').get(0)!=self){
						var isprt = false;
						for(var key in papa){
							isprt |= $(this).parent('ul').get(0)==papa[key]?true:false;
						}
						var isNeb = false;
						$(this).parent('ul').find('>li:not(.bench)').each((function(self){
							return function(){
								isNeb |= $(this).find('a').get(0)==self?true:false;
							};
						})(self, isNeb));
						if(!isprt||isNeb){
							$(this).removeClass('thispage'); 
							$(this).find('ul').slideUp();
						}
						if( (!isprt&&!isNeb)&&
							$(this).attr('id')!=_$stepDefault.attr('id')&&
							$(this).attr('id')!=_$stepDesign.attr('id')&&
							$(this).attr('id')!=_$stepLayout.attr('id')
						){
							$(this).parent('ul').slideUp();
						}
					}
				};
			})(self));

			$(this).parent().addClass('thispage');
			$(this).siblings('ul').slideToggle();
		});

	});

	function getAncestor(INself){
		var OUTbuf = [];
		INself = $(INself).parent().parent('ul').get(0);

		while(INself!=undefined){
			OUTbuf.push(INself);
			INself = $(INself).parent().parent('ul').get(0);
		}
		return OUTbuf.length==0?undefined:OUTbuf;
	}



	function setScrn(INnewSet=_tmpSize[2])
	{
		/*B*/
		_$panelBtn.each(function(){
			$(this).removeClass('active');
		});

		/*A*/
		switch(INnewSet){
			case _tmpSize[1]:
				$('.'+_tmpSize[1]).addClass('active');
				_$article.removeClass();
				_$article.addClass('tmp_middle');
				break;
			case _tmpSize[0]:
				$('.'+_tmpSize[0]).addClass('active');
				_$article.removeClass();
				_$article.addClass('tmp_small');
				break;
			default:
				$('.'+_tmpSize[2]).addClass('active');
				_$article.removeClass();
				break;
		}
	}

	function setImg(INurl=null, INnewSet=_tmpSize[2], INisLock=true)
	{
		// initial
		menuLock = INisLock;
		setScrn(INnewSet);

		if(INurl){
			_$iframe.attr('src', '').css({'background':'url('+INurl+') no-repeat', 'background-size':'100% auto'});
			_$article.css({'overflow-y':'auto'});

			let url = _$iframe.css('background-image').replace('url', '').replace('(', '').replace(')', '').replace('"', '').replace('"', '');
			let bgImg = $('<img />');
			bgImg.hide().bind('load', function(){
					wait2go($(this).height()-(INnewSet==_tmpSize[2]?0:15), $(this).width());
				}).attr('src', url);
			_$article.append(bgImg);
		}
	}
	function wait2go(INh,INw)
	{
		setTimeout(function(){
		    _$iframe.css({'height':INh*(_$iframe.width()/INw)});
		}, 150);
	}
}
})(jQuery)