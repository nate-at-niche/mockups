$(document).ready(function () {


	

	$('[transform], [rounds]').on('change', function () {
		var value = "$12,345.67%:1";
		var $transforms = $(this).closest('.template-configure').find('[transform]:not(:checked)');
		var $rounds = $(this).closest('.template-configure').find('[rounds]:checked');
		
		$transforms.each(function (i, transform) {
			switch($(transform).attr('transform')) {
				case "commas": value = value.replace(',', ''); break;
				case "ratio": value = value.replace(':1', ''); break;
				case "dollar": value = value.replace('$', ''); break;
				case "percent": value = value.replace('%', ''); break;
			}
		});
		switch($rounds.attr('rounds')) {
			case "round10": value = value.replace('45.67', '50'); break;	
			case "round0dec": value = value.replace('5.67', '6'); break;
			case "round1dec": value = value.replace('5.67', '5.7'); break;
			case "round1000": value = value.replace(',345.67', 'k').replace('345.67', 'k'); break;
		}
		$($(this).closest('.template-configure').attr('rel')).find('.fact-value-inner').html(value);
		var tableValueElems = $($(this).closest('.template-configure').attr('rel')).find('.national-avg-table-value, .fact-table .value');
		tableValueElems.map(function (i, elem) {
			elem.childNodes[0].nodeValue = value;
		});
		$($(this).closest('.template-configure').attr('rel')).find('.national-avg-value').html(value);
	});

	$('[toggle-class], [toggle]').on('change', function () {
		var $this = $(this),
			$rel = $($this.closest('.template-configure').attr('rel')),
			$toggle = $rel.find($this.attr('toggle')),
			toggleClass = $this.attr('toggle-class'),
			$targets = $rel.find('.fact-wrapper, .fact-table, .review-stars, .niche-grade, .rankings-badge');

		if ($this.is('[type="radio"]')) {
			$('[name="' + $this.attr('name') + '"]').each(function () {
				$targets.removeClass($(this).attr('toggle-class'));
			});
		}
		if ($this.prop('checked')) {
			$toggle.show();
			$targets.addClass(toggleClass);
		} else {
			$toggle.hide();
			$targets.removeClass(toggleClass);
		}
	});
	$('input[type="checkbox"]').trigger('change');

	$('.null-state-toggle').on('click', function () {
		var $this = $(this),
			$turnOn = $($(this).attr('turn-on')),
			$turnOff = $($(this).attr('turn-off'));
		
		if ($this.hasClass('on')) {
			$turnOn.hide();
			$turnOff.show();
			$this.removeClass('on');
		} else {
			$turnOff.hide();
			$turnOn.show();
			$this.addClass('on');
		}
	});
	$('.null-state-toggle').each(function () {
		$($(this).attr('turn-on')).hide();
	});







	$('[data-show]').on('click', function () {
		$($(this).attr('data-show')).show();
	});

	$('[data-hide]').on('click', function () {
		$($(this).attr('data-hide')).hide();
	});
	
	$('[data-remove]').on('click', function () {
		$($(this).attr('data-remove')).remove();
	});
	
	$('[data-replicate]').each(function () {
		var count = $(this).attr('data-replicate')*1;

		for (i = 0; i < count; i++) {
			$(this).clone().insertAfter(this);
		}
	});
	
	$('[data-lorem]').each(function () {
		$(this).html(lorem($(this).attr('data-lorem')));
	});

	$('.collapsed').on('click', function () {
		$(this).removeClass('collapsed');
	});

	$('.card-tabs li').on('click', function () {
		$(this).siblings('li').removeClass('selected');
		$(this).siblings('li').each(function () {
			$(this).removeClass('selected');
			$($(this).attr('rel')).hide();
		});
		$(this).addClass('selected');
		$($(this).attr('rel')).show();
	});

	$('#global-nav').html('<section class="global-navigation"><section class="global-menu__wrapper"><nav class="global-menu" role="menubar"><div class="global-menu__logo__wrapper"><span class="icon-hamburger-thin--global-menu"></span><h1 alt="Niche" class="global-menu__logo"><a href="#" class="global-menu__logo__link"></a></h1></div><div class="mobile-global-menu__logo__wrapper"></div><ul class="global-menu__list"><li class="global-menu__list__item"><a class="global-menu__list__item__link" href="#" role="menuitem">Local</a></li><li class="global-menu__list__item"><a class="global-menu__list__item__link" href="#" role="menuitem">K-12</a></li><li class="global-menu__list__item"><a class="global-menu__list__item__link" href="#" role="menuitem">Colleges</a></li></ul><span class="icon-account-thin--global-menu"></span></nav></section><section class="secondary-menu__wrapper"><nav class="secondary-menu" role="menubar"><div class="secondary-menu__nav"><ul class="nav-list--secondary"><li class="nav-list__item--secondary" role="menuitem"><a class="nav-list__item__link--secondary find" href="#"></a></li><li class="nav-list__item--secondary" role="menuitem"><a class="nav-list__item__link--secondary best" href="#"></a></li><li class="nav-list__item--secondary" role="menuitem"><a class="nav-list__item__link--secondary review" href="#"></a></li></ul></div><div class="sherlock__wrapper"><input class="sherlock" placeholder="Search schools &amp; districts ..."></input><span class="icon-search-thin--sherlock"></span></div></nav></section></section>');








	var factFeatures = {
		'Scalar': [
			{ 'round': 'Round' },
			{ 'commas': 'Add Commas' },
			{ 'percent': 'Percent' },
			{ 'dollar': 'Dollar' },
			{ 'modify': 'Modifiers' },
			{ 'subtitle': 'Subtitle' },
			{ 'tooltip': 'Tooltip' },
			{ 'national': 'National Average' },
			{ 'suffix': 'Suffix' },
			{ 'description': 'Description' },
			{ 'pie': 'Pie Chart' }
		],
		'FactTableRow': [
			{ 'round': 'Round' },
			{ 'commas': 'Add Commas' },
			{ 'percent': 'Percent' },
			{ 'dollar': 'Dollar' }
		],
		'BareValue': [
			{ 'round': 'Round' },
			{ 'commas': 'Add Commas' },
			{ 'percent': 'Percent' },
			{ 'dollar': 'Dollar' }
		],
		'PollSingleValue': [
			{ 'pie': 'Pie Chart' },
		],
		'PollTableRow': [],
		'Grade': [
			{ 'modify': 'Modifiers' },
			{ 'label': 'Label' },
			{ 'tooltip': 'Tooltip' },
			{ 'description': 'Description' },
			{ 'methodology': 'Methodology Link' }
		]
	};



	$('body').append('<div id="fact-modal" class="fact-modal"><div class="niche-icon close" id="fact-modal-close"></div><div class="fact-modal-content"></div></div>');
	$('[config-content-type]').each(function () {
		var $this = $(this);

		$this.on('click', function () {
			var $modal = $('#fact-modal');
			var html = $('<ul/>');
			$('[config-content-type]').removeClass('debug-highlight');
			$this.addClass('debug-highlight');

			var type = $this.attr('config-content-type');

			html.append('<li><strong>Type</strong><span>' + type +  '</span></li>');

			factFeatures[type].map(function(f, i) {
				var key = Object.keys(f)[0],
					value = '<span class="niche-icon thick close"></span>';

				if ($this.attr('config-' + key) !== undefined) {
					value = ($this.attr('config-' + key)) ? '<span>' + $this.attr('config-' + key) + '</span>' : '<span class="niche-icon thick check"></span>';
				}

				html.append('<li><strong>' + f[key] + '</strong>' + value +  '</li>');
			});

			$modal.find('.fact-modal-content').html(html);
			$modal.show();
		});

	});
	$('body').on('click', '#fact-modal-close', function () {
		$('#fact-modal').hide();
		$('.fact-wrapper').removeClass('highlighted');
	});




});

function lorem(length) {
	var full = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id pretium libero. Aenean arcu purus, elementum non neque ut, cursus finibus lacus. Nunc tempus tincidunt interdum. Ut maximus hendrerit arcu in venenatis. Quisque pellentesque faucibus leo nec euismod. Sed malesuada, mauris sit amet porttitor placerat, diam nibh consequat neque, in rutrum urna libero sed sapien. Aliquam sagittis ante non dui aliquet efficitur. Vivamus id diam sit amet nisi dictum porta. Ut sed erat vitae leo pharetra faucibus nec at ligula. Donec dictum, quam vel sodales dapibus, arcu ante ultrices nulla, eget mollis sapien nisi fermentum massa. Vestibulum a ornare metus, id mollis massa. Aenean urna velit, pharetra eu lorem in, porttitor blandit est. Nam rhoncus urna at dui efficitur laoreet. Quisque ac euismod arcu. Vivamus leo leo, facilisis non augue id, volutpat mattis odio. Pellentesque eu mi eu turpis tempus pulvinar. Aliquam iaculis, quam nec pretium consectetur, mauris lorem ornare diam, ac aliquam sapien massa vitae nulla. Praesent sed nulla neque. Curabitur dignissim faucibus lacus. In sed massa justo. Sed nisi purus, malesuada et est ut, consectetur aliquet tortor. In pretium blandit nibh eu faucibus. Vivamus egestas risus metus. Nam elementum euismod ante, eget ullamcorper ante sodales eget. Curabitur purus quam, rhoncus vel quam et, ornare laoreet odio. Quisque eu gravida dolor. In lacus ipsum, placerat in blandit non, iaculis vel dui. Aenean a ipsum eu dui porta dictum vitae sed lectus. In vehicula porta hendrerit. Quisque commodo quis ligula eget luctus. Vestibulum fermentum ligula quis pharetra pellentesque. Suspendisse egestas tincidunt condimentum. Morbi commodo dictum elit non consectetur. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Curabitur a varius quam, non interdum lorem. Sed faucibus fringilla ante vel accumsan. Nulla consequat, nibh auctor aliquet aliquet, urna lectus lacinia ligula, id condimentum mauris sem nec nibh. Vivamus ut sapien et tellus bibendum posuere non vitae metus. Aenean non nibh est. Integer non lorem at felis imperdiet fringilla. Donec iaculis quam ut diam porta luctus. Mauris tempus, ipsum in efficitur fringilla, ante lacus viverra elit, et varius odio enim eu nibh. Praesent vel porta est. Donec porta finibus convallis. Ut justo metus, eleifend quis est vitae, fringilla tincidunt sapien. Etiam interdum aliquet odio, quis auctor felis pellentesque sit amet. Sed mattis tincidunt suscipit. In eleifend varius quam nec commodo. Nunc in vestibulum libero, eget cursus leo. Integer ut magna auctor erat congue facilisis et vel nibh. Maecenas auctor libero nec gravida molestie. Maecenas vestibulum semper ante, vitae cursus risus viverra venenatis. Cras vitae facilisis neque, a feugiat est. Morbi sed tempus velit. Nullam laoreet velit ac consectetur convallis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum finibus leo quis auctor egestas. Vestibulum ut nisl massa. Ut consectetur, diam a pulvinar tincidunt, mi ipsum malesuada orci, ac condimentum augue mi id eros.";

	return full.substr(0, length);
}


