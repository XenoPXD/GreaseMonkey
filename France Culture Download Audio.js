// ==UserScript==
// @name        FranceCulture Download Audio
// @namespace   FRCD
// @match       https://www.franceculture.fr/*
// @version     1
// @grant       none
// ==/UserScript==
// Jquery déjà inclu dans le script de france culture : // @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
var a = '<div style=\'{stylePos}\'><a id=\'enregistrerSous{reference}\' href=\'{source}\' download style=\'border-radius: 50%;border: 2px solid {styleColor};padding:17px 12px 9px 12px;margin:38px;color:gray;line-height: 1;background-color:transparent;font-family: itc_franklin_gothic_stdMd;font-size: 14px;\' title=\'Download [{file}] &#10;by Xéno PXÐ\'>{svg}</a></div>';
var aStylePosTeaser = 'position:relative;left:-38px;top:18px;padding-bottom:28px;width:20px;';
var aStylePosBoxFlow = 'position:relative;left:-38px;top:92px;padding-bottom:28px;width:20px;';
var aStylePosBoxContent = 'position:relative;left:-45px;top:13px;padding-bottom:28px;width:20px;';
var svgDownload = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 433.5 433.5" style="enable-background:new 0 0 433.5 433.5;" xml:space="preserve" ><g id="file-download"><path fill="{styleColor}" d="M395.25,153h-102V0h-153v153h-102l178.5,178.5L395.25,153z M38.25,382.5v51h357v-51H38.25z"/></g></svg>';
var svgStyleColorTeaser = '#802489';
var svgStyleColorTeaserHover = '#2879ff';
var svgStyleColorBox = '#d1d1e5';
var svgStyleColorBoxHover = '#ffffff';
document.body.onload = function () {

    var pageURLCheckTimer = setInterval(function () {
        if (this.lastPathStr !== location.pathname || this.lastQueryStr !== location.search || this.lastPathStr === null || this.lastQueryStr === null
           ) {
            this.lastPathStr = location.pathname;
            this.lastQueryStr = location.search;
            go();
        }
    }, 50
    );
};
function go() {
    console.log('FranceCulture_Download | start');
    // Add button download
    $('button[class^=\'replay-button\']').each(function (index) {
        var reference = $(this).attr('data-business-reference');
        var source = $(this).attr('data-asset-source');
        if (reference !== undefined && source !== undefined) {
            var divClassTmp = $(this).parent().attr('class');
            var aStylePos = '';
            var aStyleColor = '';
            var btnType = '';
            console.log('parent class : ' + divClassTmp);
            if (divClassTmp.startsWith('box-flow')) {
                aStylePos = aStylePosBoxFlow;
                aStyleColor = svgStyleColorBox;
                btnType = '_1_';
            } else if (divClassTmp.startsWith('box-content')) {
                aStylePos = aStylePosBoxContent;
                aStyleColor = svgStyleColorBox;
                btnType = '_1_';
            } else {
                aStylePos = aStylePosTeaser;
                aStyleColor = svgStyleColorTeaser;
                btnType = '_0_';
            }
            var svgTmp = svgDownload.replace('{styleColor}', aStyleColor);
            var aTmp = a.replace('{reference}', btnType + reference).replace('{source}', source).replace('{file}', source.split('/').pop()).replace('{svg}', svgTmp).replace('{stylePos}', aStylePos).replace('{styleColor}', aStyleColor);
            $(this).after(aTmp);
        }
    });
    // style css
    $('a[id^=\'enregistrerSous_0_\']').hover(function () {
        $(this).css('border-color', svgStyleColorTeaserHover);
        $(this).find('path').css('fill', svgStyleColorTeaserHover);
    }, function () {
        $(this).css('border-color', svgStyleColorTeaser);
        $(this).find('path').css('fill', svgStyleColorTeaser);
    }
                                            );
    $('a[id^=\'enregistrerSous_1_\']').hover(function () {
        $(this).css('border-color', svgStyleColorBoxHover);
        $(this).find('path').css('fill', svgStyleColorBoxHover);
    }, function () {
        $(this).css('border-color', svgStyleColorBox);
        $(this).find('path').css('fill', svgStyleColorBox);
    }
                                            );
    console.log('FranceCulture_Download | end');
}