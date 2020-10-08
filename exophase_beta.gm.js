// ==UserScript==
// @name     exophase_beta
// @include  https://www.exophase.com/user/XenoPXD/*
// @include  https://www.exophase.com/*
// @version  1-2020
// @grant    GM.getValue
// @grant    GM.setValue
// @grant 	 GM.deleteValue
// @grant 	 GM.openInTab
// @grant 	 GM.setClipboard
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

// ---------------------------------------------
// -- Initialisation
// ---------------------------------------------
let $ = window.jQuery;

console.log("start beta exophase");

window.addEventListener('load', function() {

    console.log("beta page loaded");
  	addCSS();
  	let intervaleAddInfos = setInterval(addInfos, 1000);
  
  	$("div#app").addClass("wrapper-pxd");
  
  	console.log("end beta exophase");
});
                        

function addInfos() {

  let isAddGame = false;
  
  $("li.legacy").each(function() {
    
    let gameId = $( this ).attr("data-gameid");
    let isEffectue = $( this )[0].hasAttribute("data-effectue");
    
    // Change le text du logo
    let $serviceText = $(this).find("div.legacy-profile-pf").first();
    let isServiceTextEffectue = $serviceText[0].hasAttribute("data-effectue");
    if (!isServiceTextEffectue) {
    	changeText($serviceText, gameId);
    }
    $serviceText.attr("data-effectue", true);
    
    // Remplacement image cassé sur exophase
    remplacementImagesCasse($(this));
    
    // Ajoute awards    
    if (!isEffectue && getAwards(gameId)) {
        transformTitle($(this));
        addAwards($(this));
        configAwards($(this));
        isAddGame = true;
    }
    
    
  });
  
  if (isAddGame) {
  	collapse();
  }

}

function remplacementImagesCasse($element) {
  let gameId = $element.attr("data-gameid");
  let isEffectue = $element[0].hasAttribute("data-effectue");
  if (gameId == "266299" && !isEffectue) {
    let img = $element.find("img[src*='https://i.exophase.com/legacy/games/m/137147.png']");
    img.attr("src", " data:image/jpeg;base64,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");
  }
}

function configAwards($element) {
  
  console.log("configAwards START");
  
	$element.attr("data-collapse","extand");
  $element.attr("data-effectue", true);
  
  console.log("configAwards END");
}

function addAwards($element) {

  console.log("addAwards START");
  
  let gameId = $element.attr("data-gameid");
  console.log("gameId="+gameId);
  $element.removeClass("align-items-center");
  $element.append(getAwards(gameId));
  
  console.log("addAwards END");
}

function transformTitle($element) {

  console.log("transformTitle START");
  
  // Ajoute de <a> dans <H3>
  let $h3 = $element.first().find("h3.game-db-title");
  $h3.addClass("collapse-pxd");
  let a = `<a class="collapse-pxd" href="#section2">`+$h3.text()+`</a>`;
  $h3.text("");
  $h3.append(a);
  
  console.log("transformTitle END");

}

  
function changeText ($serviceText, gameId) {

  console.log("changeText START");
  console.log("$serviceText=" + $serviceText.text());

  switch ($serviceText.text()) {
    case "DC":
      $serviceText.text("DREAMCAST");
      $serviceText.removeClass("legacy-profile-pf").addClass("dreamcast-profile-pf");
      break;
    case "XBOX":
      $serviceText.removeClass("legacy-profile-pf").addClass("xbox-profile-pf");
      break;
    case "AMI":
      if (gameId == "231782" 				// Pushover
          || gameId == "198872" 		// Flashback: The Quest for Identity 
          || gameId == "266299") {	// Overkill
        $serviceText.text("AMIGA 500");
      } else {
        $serviceText.text("AMIGA");
      }
      $serviceText.removeClass("legacy-profile-pf").addClass("amiga-profile-pf");
      break;
    case "GCN":
      $serviceText.text("GAME CUBE");
      $serviceText.removeClass("legacy-profile-pf").addClass("gamecube-profile-pf");
      break;
    case "PS1":
      $serviceText.text("PLAYSTATION");
      $serviceText.removeClass("legacy-profile-pf").addClass("psn-profile-pf");
      break;
    case "2600":
      $serviceText.text("ATARI 2600");
      $serviceText.removeClass("legacy-profile-pf").addClass("a2600-profile-pf");
      break;
    default:
      console.log("Pas de changeText");
  }

  console.log("changeText END");
}


function collapse () {

  console.log("collapse START");
  
  $( "h3.collapse-pxd" ).off("click");
  
  $( "h3.collapse-pxd" ).click(function( event ) {


    $element =  $(this).parents(".legacy");

    //alert($element.html());

    // Calcul height
    let heightLI = Number($element.css("height").replace("px",""));
    console.log("heightLI=" + heightLI);
    let $awards = $element.find("div.awards-pxd");
    let heightAwards = Number($awards.css("height").replace("px",""));
    $awards.css("top", heightLI+"px" );
    console.log("heightAwards=" + heightAwards);

    if ("extand" == $element.attr("data-collapse")) {
      isPlus = true;
    } else {
      isPlus = false;
    }
    
    if (isPlus) {
      $element.css("height", (heightLI + heightAwards)+"px" );
      $element.find("div.game-controls").first().css("visibility" , "hidden") ;
      
    } else {
      $element.css("height", (heightLI - heightAwards)+"px" );
      $element.find("div.game-controls").first().css("visibility" , "visible") ;
    }

    $awards.toggle(0, function () {

      //execute this after slideToggle is done
      
      $element.attr("data-collapse", function () {
        //change text based on condition
        return $awards.is(":visible") ? "collapse" : "extand";
      });


    });


  });
  
  console.log("collapse END");
}

// CSS

function addCSS() {
	console.log("addCSS START");
  let gameCubeProfilePf = ".gamecube-profile-pf { background-color:#6557c3 }";
  let dreamcastProfilePf = ".dreamcast-profile-pf { background-color:#4165a3 }";
  let amigaProfilePf = ".amiga-profile-pf { background-color:#ffa300 }";
  let a2600ProfilePf = ".a2600-profile-pf { background-color:#c40d07 }";
  
  let fontSizeH3 = $("li.game-visible").first().find("h3.game-db-title").css("font-size");
  console.log("fontSizeH3="+fontSizeH3);
  
  let fontFamilyH3 = $("li.game-visible").first().find("h3.game-db-title").css("font-family");
  console.log("fontFamilyH3="+fontFamilyH3);
  
  let lineHeightH3 = $("li.game-visible").first().find("h3.game-db-title").css("line-height");
  console.log("lineHeightH3="+lineHeightH3);
  
  let fontWeightH3 = $("li.game-visible").first().find("h3.game-db-title").css("font-weight");
  console.log("fontWeightH3="+fontWeightH3);
  
  let css = `
		
		.wrapper-pxd { 
			background-color:white !important;
		}


		.gamecube-profile-pf { 
			background-color:#6557c3;
		}
	
		.dreamcast-profile-pf { 
			background-color:#4165a3;
		}

		.amiga-profile-pf { 
			background-color:#ffa300;
		}

		.a2600-profile-pf { 
			background-color:#c40d07;
		}

		div.title-pxd {
			font-size : 12px;
			color : #000000;
			font-size : `+fontSizeH3+` !important;
			font-weight : `+fontWeightH3+` !important;
			font-family : `+fontFamilyH3+` !important;
			line-height: `+lineHeightH3+` !important;
		}

		div.paragraphe-pxd {
			font-size : 12px;
			color : #555555;
			font-weight : 100 !important;
			font-family : `+fontFamilyH3+` !important;
			line-height: `+lineHeightH3+` !important;
			padding-right : 15px;
		}

		div.br-pxd {
			height:10px;
		}

		td.points-pxd {
			text-align : right;
			padding-right: 10px;
		}

		th.points-pxd {
			text-align : right;
			padding-right: 10px;
		}

		td.earned-date-pxd {
			color:#577f60;
			text-align : right;
			padding-right: 15px;
		}

		th.earned-date-pxd {
			text-align : right;
			padding-right: 15px;
		}

		tbody tr.list-pxd {
			line-height: 1.3 !important;
		}

		table.pxd {
      width:100%;
	 	}

    table.pxd thead {
			opacity : 1;
			color : #bebebe;
			font-size : `+fontSizeH3+` !important;
			font-weight : `+fontWeightH3+` !important;
			font-family : `+fontFamilyH3+` !important;
			line-height: 16px !important;
		}

		table.pxd tbody tr {
			line-height: 1.3 !important;
			color : #555555;
			/*opacity : .5;*/
			vertical-align:top;
			font-size : 12px;
			font-weight : 100;
			font-family : `+fontFamilyH3+`;
			/* line-height: `+ (lineHeightH3) +`;*/
			vertical-align:top;
		}

		table td.title-pxd {
			font-size : 12px;
			color : #000000;
			/* font-size : `+fontSizeH3+` !important; */
			font-weight : `+fontWeightH3+` !important;
			font-family : `+fontFamilyH3+` !important;
			/*line-height: `+lineHeightH3+` !important;*/
		}


		table.t3-pxd thead th:nth-child(1){
       	width:40%;
		}

		table.t3-pxd thead th:nth-child(2){
      	width:40%;
		}

		table.t3-pxd thead th:nth-child(3){
		}




    

   

		table.t4-pxd thead th:nth-child(1){
       width:31%;
		}

		table.t4-pxd thead th:nth-child(2){
       width:14%;
		}

		table.t4-pxd thead th:nth-child(3){
      width:31%;
			text-align : left;
			padding-right: 10px;
		}

		table.t4-pxd thead th:nth-child(4){
			text-align : right;
			padding-right: 15px;
		}

		table.t4-pxd tbody td:nth-child(1){
			vertical-align:top;
		}

		table.t4-pxd tbody td:nth-child(2){
			vertical-align:top;
		}

		table.t4-pxd tbody td:nth-child(3){
			vertical-align:top;
			text-align:right;
			padding-right: 10px;
		}

		table.t4-pxd tbody td:nth-child(4){
			vertical-align:top;
			text-align:right;
			color:#577f60;
			padding-right: 15px;
		}




		table.t5-pxd thead th:nth-child(1){
       width:31%;
		}

		table.t5-pxd thead th:nth-child(2){
       width:14%;
		}

		table.t5-pxd thead th:nth-child(3){
       width:31%;
		}

		table.t5-pxd thead th:nth-child(4){
				width:12%;
				text-align:right;
				padding-right: 10px;
		}

		table.t5-pxd thead th:nth-child(5){
				text-align:right;
				padding-right: 15px;
		}


		table.t5-pxd tbody td:nth-child(1){
			vertical-align:top;
		}

		table.t5-pxd tbody td:nth-child(2){
			vertical-align:top;
		}

		table.t5-pxd tbody td:nth-child(3){
			vertical-align:top;
		}

		table.t5-pxd tbody td:nth-child(4){
			vertical-align:top;
			text-align:right;
			padding-right: 10px;
		}

		table.t5-pxd tbody td:nth-child(5){
			vertical-align:top;
			text-align:right;
			color:#577f60;
			padding-right: 15px;
		}




    table.t7-pxd {
      width:100%;
  	}

    table.t7-pxd thead tr {
       opacity : .5;
		}

		table.t7-pxd thead th:nth-child(1){
       width:20%;
		}

		table.t7-pxd thead th:nth-child(2){
       width:20%;
		}

		table.t7-pxd thead th:nth-child(3){
       width:10%;
			 text-align:right;
		}

		table.t7-pxd thead th:nth-child(4){
				width:10%;
       text-align:right;
		}

		table.t7-pxd thead th:nth-child(5){
       width:10%;
			 text-align:right;
		}

		table.t7-pxd thead th:nth-child(6){
				width:10%;
       text-align:right;
		}

		table.t7-pxd thead th:nth-child(7){
       text-align:right;
		}

		table.t7-pxd tbody td:nth-child(1){
			vertical-align:top;
		}

		table.t7-pxd tbody td:nth-child(2){
			vertical-align:top;
		}

		table.t7-pxd tbody td:nth-child(3){
			vertical-align:top;
			text-align:right;
		}

		table.t7-pxd tbody td:nth-child(4){
			vertical-align:top;
			text-align:right;
		}

		table.t7-pxd tbody td:nth-child(5){
			vertical-align:top;
			text-align:right;
		}


		span.pxd-emo {
			/*font-size : 10px;*/
    }

		div.awards-pxd {
			display: none;
			position: absolute;
			padding-top: 0px;
			padding-bottom: 15px;
			padding-right: 20px;
			width: 100%;
  	}

`;

  $("<style type='text/css'> " + css + " </style>").appendTo("head");
  console.log("addCSS END");
}

function getAwards (gameId) {

  console.log("getAwards START");
  console.log("gameId="+gameId);

  let awards = "";

  switch (gameId) {
    case "229288": // Tom Clancy's Splinter Cell: Pandora Tomorrow

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Renversement du système de Sadono.</td>
<td>PXÐ 31</td>
<td></td>
<td>2004</td>
</tr>
<tr>
<td>Finir toutes les missions en mode normal solo</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>
`;
      break;

    case "222867": // Tom Clancy's Splinter Cell: Chaos Theory

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Sentinel.</td>
<td>PXÐ 31</td>
<td></td>
<td>2005</td>
</tr>
<tr>
<td>Finir toutes les missions en mode normal solo</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;
      break;
      
      case "265366": // Stealth Bastard: Tactical Espionage Arsehole 

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Member of all challenges</td>
<td>PXÐ 31</td>
<td></td>
<td>September 11, 2013</td>
</tr>
<tr>
<td>Finish all rooms</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;
      
      break;
      
            case "209443": // Tom Clancy's Splinter Cell 

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Empêcher la troisième guerre mondiale</td>
<td>PXÐ 31</td>
<td></td>
<td>October 6, 2007</td>
</tr>
<tr>
<td>Finir toutes les missions en mode normal solo</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;
      
      break;
      
                  case "241089": // Oddworld: Stranger's Wrath

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Tous en prison</td>
<td>PXÐ 31</td>
<td></td>
<td>2005</td>
</tr>
<tr>
<td>Vous avez terminez toutes les missions solo</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;
      
      break;
      
    case "199964": // Resident Evil 4

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Leon Scott Kennedy</td>
<td>PXÐ 31</td>
<td></td>
<td>2006</td>
</tr>
<tr>
<td>Terminer la mission en mode normal solo</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;

      break;
      
    case "211885": // Halo 2

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Guerrier</td>
<td>PXÐ 31</td>
<td></td>
<td>2004</td>
</tr>
<tr>
<td>Terminer la mission en mode normal solo</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;

      break;
      
          case "229823": // Beyond Good & Evil

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Beyond Good & Evil</td>
<td>PXÐ 31</td>
<td></td>
<td>2004</td>
</tr>
<tr>
<td>Terminez le jeu</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;

      break;
      
                case "213786": // Quake

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Rassembler quatre runes magiques</td>
<td colspan="2">Codonopsys & PXD</td>
<td class="earned-date-pxd">August 13, 1998</td>
</tr>
<tr>
<td>Terminer la mission</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;

      break;
      
    		case "202377": // Halo: Combat Evolved 

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">La naissance d'un spartan</td>
<td>PXÐ 31</td>
<td></td>
<td>dim. 7 avr. 2002</td>
</tr>
<tr>
<td>Terminez la campagne en mode normal solo</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;

      break;
      
         case "231218": // Millennium Soldier: Expendable

      awards = `
<div class="awards-pxd">

<table class="pxd t5-pxd">
<thead>
<tr>
<th>Scoring</th>
<th>Joueur</th>
<th>Comment</th>
<th>Points</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Faire le plus de point possible</td>
<td>PXÐ 31</td>
<td>« <span style="font-size:12px;"><i>Réalisé en finissant la mission.</i></span> »</td>
<td><span class="pxd-emo">💀</span> 1 059 415</td>
<td>2000</td>
</tr>
<tr>
<td>Terminez la campagne en mode normal solo</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;

      break;
      
         case "203287": // Metropolis Street Racer

      awards = `
<div class="awards-pxd">

			<div style="display : flex;padding-right:40px;">
					<img style="flex: 2;" src="https://qzl14g.am.files.1drv.com/y4m2dBESxKBjS3u7riDhECN2nz9LDOe2TqlbgWl7uuVZJ4j-IOktf071Bt5-qgFVSBAQMvDnB2HVVz2W_lSWPe53OTwOeINv1umwrd0dIRSnT_4kRGgoKsZbQWd7dgCFvCKzSWZliNDXbTTBRjIDo3KbLFwbbCUJzZA1dH5OlwHQQr-rGpLshpPBdHCgseKgcOxRCoOjS3QzsYDagZP_NAdSA?width=450&height=352&cropmode=none" 
					alt="flyer_concours_dreamcast_metropolis_streetr_racer" title="alt="flyer_concours_dreamcast_metropolis_streetr_racer""/>
					<div style="flex : 6;text-align: justify;padding-left:40px;" class="title-pxd">Sega France organise un concours sur Dreamcast avec l'ensemble des magasins Micromania du 8/01/2001 au 17/03/2001 à l'occasion de la sortie du jeu MSR. Ce concours se déroulera en trois phases.</div>
				</div>

<div class="br-pxd"></div>
<div class="title-pxd">• <b>Sélection préliminaire</b></div>
<div class="paragraphe-pxd" style="text-align: justify;">Être dans les 2 meilleurs scores de Toulouse sur Street Race - Chapitre 18 - Race 7 (Old Palace Yard North). Les joueurs enregistrent leurs meilleurs scores (nombre de kudos obtenus) sur leur Visual Memory et l'apportent à leur magasin Micromania entre le 08/01 et le 11/02/2001. La course doit être jouée sans joker. </div>
<div class="br-pxd"></div>


<table class="pxd t5-pxd">
<thead>
<tr>
<th>Scoring</th>
<th>Joueur</th>
<th>Comment</th>
<th>Kudos</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Faire le plus de point possible</td>
<td>PXÐ 31</td>
<td>Qualifié. Prix : un tee-shirt Dreamcast 😊</td>
<td>4 214,20</td>
<td>10 févr. 2001</td>
</tr>
<tr>
<td></td>
<td>CodoNopsys</td>
<td>Éliminé 😠</td>
<td>3 782,40</td>
<td>févr. 2001</td>
</tr>
</tbody>
</table>

<div class="br-pxd"></div>
<div class="title-pxd" style="">• <b>Sélection pour la finale</b></div>
<div class="paragraphe-pxd" style="text-align: justify;">Être dans les 4 meilleurs scores de France sur Street Race - Chapitre 19 - Race 7 (Parliament Street South II). Les 2 meilleurs scores de chaque magasin sont invités à s'affronter dans leur micromania le 24/02/2001 entre 14 et 16 h. Les quatre meilleurs scores de ces sélections se déroulant dans chaque Micromania seront qualifiés pour la grande finale nationale. La course doit être jouée sans joker. Les Noms des quatres finalistes seront affichés dans l'ensemble des Micromania.</div>
<div class="br-pxd"></div>

				<table class="pxd t5-pxd">
					<thead>
            <tr>
							<th>Scoring</th>
              <th>Joueur</th>
              <th>Comment</th>
              <th>Kudos</th>
              <th>Earned Date</th>
            </tr>
					</thead>
					<tbody>
            <tr>
							<td class="title-pxd">Faire le plus de point possible</td>
              <td>Oliver Guerre</td>
              <td>Qualifié</td>
              <td>9 458,40</td>
              <td>24 févr. 2001</td>
            </tr>
            <tr>
							<td></td>
              <td>François Godet</td>
              <td>Qualifié</td>
              <td>9 458,40</td>
              <td>24 févr. 2001</td>
            </tr>
            <tr>
							<td></td>
              <td>Alexandre Peyron</td>
              <td>Qualifié</td>
              <td>9 458,40</td>
              <td>24 févr. 2001</td>
            </tr>
            <tr>
							<td></td>
              <td>Cyril Danan</td>
              <td>Qualifié</td>
              <td>9 286,20 </td>
              <td>24 févr. 2001</td>
            </tr>
            <tr>
              <td></td>
              <td>…</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
							<td></td>
              <td>PXÐ 31</td>
              <td>Éliminé 😠</td>
              <td>9 286,20 </td>
              <td>24 févr. 2001</td>
            </tr>
					</tbody>
        </table>

<div class="br-pxd"></div>
				<div class="title-pxd">• <b>Grande Finale Nationale</b></div>
				<div class="paragraphe-pxd" style="text-align: justify;">Le gagnant sera celui qui aura réalisé le meilleur score (au cumul) aux 2 courses, Street Race - Chapitre 20 - Course 7 - Jefferson West IV - Target position 4 et Street Race - Chapitre 20 - Course 8 - Nishi Shinjuku Restaurant - Target position 4. Les 4 finalistes seront invités à s'affronter à Paris en présence d'un huissier le 17/03/2001 entre 14 et 16 h. La finale se déroulera entre les quatres sélectionnés sur deux parcours.</div>
<div class="br-pxd"></div>


				<table class="pxd t5-pxd">
          <thead>
						<tr>
							<th>Scoring</th>
              <th>Joueur</th>
              <th>Comment</th>
              <th>Kudos</th>
              <th>Earned Date</th>
            </tr>
					</thead>
					<tbody>
            <tr>
							<td class="title-pxd">Faire le plus de point possible</td>
              <td>Alexandre Peyron</td>
              <td>Gagnant. Prix : Une Opel Speedster d'une valeur de 210 000 F.</td>
              <td>?</td>
              <td>17 mars 2001 </td>
            </tr>
					</tbody>
        </table>


</div>`;

      break;
      
         case "220105": // Genma Onimusha

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th class="earned-date-pxd">Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Devoir accompli</td>
<td>PXÐ 31</td>
<td></td>
<td class="earned-date-pxd">May 20, 2002</td>
</tr>
<tr class="list-pxd">
<td>Terminer la mission en mode normal solo</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

<div class="br-pxd"></div>

<table class="pxd t5-pxd">
<thead>
<tr>
<th>Scoring</th>
<th>Joueur</th>
<th>Comment</th>
<th class="points-pxd">Points</th>
<th class="earned-date-pxd">Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Atteindre le meilleur Rang</b></td>
<td>PXÐ 31</td>
<td>Rang : B, Ennemis tués : 928, Âmes collectées : 80 690</td>
<td class="points-pxd">23</td>
<td class="earned-date-pxd">May 20, 2002</td>
</tr>
</tbody>
</table>

<div class="br-pxd"></div>

<table class="pxd t5-pxd">
<thead>
<tr>
<th>Chrono</th>
<th>Joueur</th>
<th>Comment</th>
<th class="points-pxd">Temps</th>
<th class="earned-date-pxd">Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Faire le meilleur temps</b></td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">7h 48min</td>
<td class="earned-date-pxd">May 20, 2002</td>
</tr>
</tbody>
</table>

</div>`;

      break;

    case "199680": // Lemmings 

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th>Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">You as a MASTER Lemmings</td>
<td>PXD</td>
<td></td>
<td>1998</td>
</tr>
<tr>
<td>You have completed all Mayhen levels</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

</div>`;

      break;
      
          case "252805": // MotoGP: Ultimate Racing Technology

      awards = `
<div class="awards-pxd">

<table class="pxd t4-pxd">
<thead>
<tr>
<th>Achievement</th>
<th>Joueur</th>
<th>Comment</th>
<th class="earned-date-pxd">Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Légendaire <span class="pxd-emo">💎</span></td>
<td>PXÐ 31</td>
<td></td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Terminer 1<sup>er</sup>, avec 250 points, le grand prix en mode légendaire</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

<div class="br-pxd"></div>

<table class="pxd t5-pxd">
<thead>
<tr>
<th>Championnat arcade</th>
<th>Joueur</th>
<th>Comment</th>
<th class="points-pxd">Points</th>
<th class="earned-date-pxd">Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Faire le plus de points possible</b></td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">2 875 257</td>
<td class="earned-date-pxd">2003</td>
</tr>
</tbody>
</table>

<div class="br-pxd"></div>

<table class="pxd t5-pxd">
<thead>
<tr>
<th>Circuit
<th>Joueur</th>
<th>Comment</th>
<th class="points-pxd">Chrono</th>
<th class="earned-date-pxd">Earned Date</th>
</tr>
</thead>
<tbody>
<tr>
<td class="title-pxd">Suzuka au Japon</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="list-pxd">
<td>Mode standard.</td>
<td>CodoNopsys</td>
<td></td>
<td class="points-pxd">1:29.160</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode standard.</td>
<td>.bin</td>
<td></td>
<td class="points-pxd">1:31.780</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode standard.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:55.585</td>
<td class="earned-date-pxd">2003</td>
</tr>

<tr>
<td class="title-pxd">Jerez en Espagne</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:39.133</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>CodoNopsys</td>
<td></td>
<td class="points-pxd">1:45.299</td>
<td class="earned-date-pxd">2003</td>
</tr>


<tr>
<td class="title-pxd">Le Mans en France</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:24.667</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>CodoNopsys</td>
<td></td>
<td class="points-pxd">1:29.160</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>.bin</td>
<td></td>
<td class="points-pxd">1:31.780</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode inversé.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:30.250</td>
<td class="earned-date-pxd">2003</td>
</tr>


<tr>
<td class="title-pxd">Mugello en Italie</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:39.133</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>CodoNopsys</td>
<td></td>
<td class="points-pxd">1:45.299</td>
<td class="earned-date-pxd">2003</td>
</tr>


<tr>
<td class="title-pxd">Assen au Pays-Bas</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:56.433</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode inversé.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">2:02.200</td>
<td class="earned-date-pxd">2003</td>
</tr>


<tr>
<td class="title-pxd">Domingston en Angleterre</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:25.917</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode inversé.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:29.960</td>
<td class="earned-date-pxd">2003</td>
</tr>


<tr>
<td class="title-pxd">Sachsenring en Allemagne</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:13.533</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode inversé.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:20.100</td>
<td class="earned-date-pxd">2003</td>
</tr>


<tr>
<td class="title-pxd">Brno (Masaryk) en Tchéquie</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:49.650</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode inversé.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:54.310</td>
<td class="earned-date-pxd">2003</td>
</tr>


<tr>
<td class="title-pxd">Valencia en Espagne</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:27.683</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode inversé.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:32.950</td>
<td class="earned-date-pxd">2003</td>
</tr>


<tr>
<td class="title-pxd">Phillip Island</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="list-pxd">
<td>Mode Standard.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:23.988</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tr class="list-pxd">
<td>Mode inversé.</td>
<td>PXÐ 31</td>
<td></td>
<td class="points-pxd">1:29.500</td>
<td class="earned-date-pxd">2003</td>
</tr>
<tbody>

</table>



</div>`;

      break;

  }

  console.log("getAwards END");

  return awards;

}
