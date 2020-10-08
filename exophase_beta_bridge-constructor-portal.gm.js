// ==UserScript==
// @name     exophase_beta_bridge-constructor-portal
// @include  https://www.exophase.com/game/bridge-constructor-portal-xbox/*
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

window.addEventListener('load', function() {

  console.log("START beta exophase bridge-constructor-portal : page loaded");
  addCSS();
  addInfos();
  console.log("END beta exophase bridge-constructor-portal");

});

function addInfos () {

  let $awardsLink = $("a.awards-link").parent();
  //alert($awardsLink.html());
  let li = `<li><a class="score-detail-link" href="#section2">Score detail</a></li>`;
  $awardsLink.after(li);
  displayScoreDetail();

}




function displayScoreDetail () {

  console.log("displayScoreDetail START");

  $("a.score-detail-link").parent().off("click");

  $("a.score-detail-link").parent().click(function( event ) {

    // Récupération de la liste
    let $ul = $("a.score-detail-link").parents("ul");
    
    // Supression du css des <a> sélectionnés
    $ul.find("a").each(function( index ) {
      //alert( index + ": " + $( this ).text() );
      $(this).addClass("a-no-actived");
    });
    
    // Ajout du css de notre <a> score-detail
    $("a.score-detail-link").removeClass("a-no-actived");
    $("a.score-detail-link").addClass("a-actived");

    // Disparition du contenue restant des autres pages
    $("div.btn-group").css("display", "none");
    $("h3.listing").css("display", "none");
    $("div.user-container").css("display", "none");
    
    // Réinitialise <div.game-page>
    $("div.game-page").remove();
    $("#game-column").after("<div class = 'game-page' style='padding-bottom:15px;'></div>");
    let $gamePage = $("div.game-page");
    
    // Valorise <div.game-page>
    
    let content = `
<!-- <h4 class="listing listing-alt"><span>Bridge Constructor Portal Score Detail</span></h4> -->

<div>

<h4 class="listing listing-alt"><span>Bonjour, candidat 9723 !</span></h4>

<h4 class="listing "><span>Niveau 01 : Mon premier pont</span></h4>


<div class="row-pxd">
					
	<div class="column1-pxd">
      <div class="column1-content-pxd">
			<video class="video-pxd" controls controlsList="nodownload" preload="none" poster="https://2drkhg.am.files.1drv.com/y4mZ6NKo48DqXZd6gioimac6jqPOGi2YSZJ1CwKo1h6ulBu0_l--_Wkvy7xlNGRKyznIyvAe1QIjH_PPTB2iTfAvK2gfoCLPtdWRHm5l1XmusEEe0VFDc6e8HSHjOG-RzcJtiklUu7BtuDzq9aVIXyg1NDvmGSnNKEAV2nIwaKOkGcWjv9yM1vAa-Fio02ymyg72zdT-x_afsa5ZnIgHDGghQ?width=3840&height=2160&cropmode=none">
      <source src="https://onedrive.live.com/download?cid=0157F2DFDC7AF879&resid=157F2DFDC7AF879%212209&authkey=AEOTxQiixIf8X-g" type="video/mp4">
      Your browser does not support the video tag.
      </video>
			<table width="100%" style="" class="font-pxd">
				<tr>
					<th class="text2-pxd video-td1-pxd font-pxd">Xéno PXÐ</th>
					<th class="greentxt time_txt video-td2-pxd">April 2, 2020</th>
				</tr>
			</table>
			</div>
	</div>

	<div class="column2-pxd">

    <table class="pxd t5-pxd font-pxd">
    <thead>
    <tr>
    <th>Challenge</th>
    <th>Joueur</th>
    <th>Comment</th>
    <th>Score</th>
    <th>Earned Date</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td class="font-pxd">Vous avez gaspillé</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>$10 100</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    <tr>
    <td>Véhicule de test passées</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>6/6</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    </tbody>
    </table>

	</div>
</div>



<h4 class="listing "><span>Niveau 02 : Pentes</span></h4>

<div class="row-pxd">
					
	<div class="column1-pxd">
      <div class="column1-content-pxd">
			<video class="video-pxd" controls preload="none" poster="https://2dstka.am.files.1drv.com/y4mVRVQIXHvg2Klo98kLVXkgI4NZOM7r49M-HHSg9e0o7kNB5i2HWG5Y76onB9YYWpVs6gBTigwBTAHAmProZGEKdCBCjlyqZa1a5vyWxcTwdaviuESEssEB77gAZxDJLcZzrufO4UJ9pazycLFb9U0f6ej6btf_hUNiU13t_C12OK4ZSqFbFxP3SXxA8-Xrv8uFReXOkBpgvNRNkYrgeZMpw?width=3840&height=2160&cropmode=none">
      <source src="https://onedrive.live.com/download?cid=0157F2DFDC7AF879&resid=157F2DFDC7AF879%212211&authkey=ALwZXJWFDQhCEvE" type="video/mp4">
      Your browser does not support the video tag.
      </video>
			<table width="100%" style="">
				<tr>
					<th class="text2-pxd video-td1-pxd">Xéno PXÐ</th>
					<th class="greentxt time_txt video-td2-pxd">April 2, 2020</th>
				</tr>
			</table>
			</div>
	</div>

	<div class="column2-pxd">

    <table class="pxd t5-pxd">
    <thead>
    <tr>
    <th>Challenge</th>
    <th>Joueur</th>
    <th>Comment</th>
    <th>Score</th>
    <th>Earned Date</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Vous avez gaspillé</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>$13 700</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    <tr>
    <td>Véhicule de test passées</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>6/6</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    </tbody>
    </table>

	</div>
</div>

<h4 class="listing "><span>Niveau 03 : Tunnel quantique</span></h4>

<div class="row-pxd">
					
	<div class="column1-pxd">
      <div class="column1-content-pxd">
			<video class="video-pxd" controls controlsList="nodownload" preload="none" poster="https://2dt4sw.am.files.1drv.com/y4m2MPk2C-OjGlRwf_Q-kYOQwI_10JGn-FJcycpO2huS3A0F7r9mozYMi39gdXMjyUwPqVXRdomO2PBcFZzeEyNUp2FyofA756Ua6Om6hksxvtJqCx7I9q-xg25mvHVNx94BtD2VuWRhsB2-rg9sSbF--gVA1b18Tg-k_b6J0KDBBpHfSIM5SbUdacTl6e0kAoAGRMEicDgNtkZR5PAuc_tfA?width=3840&height=2160&cropmode=none">
      <source src="https://onedrive.live.com/download?cid=0157F2DFDC7AF879&resid=157F2DFDC7AF879%212215&authkey=AG_Wsd2tO0zY9e4" type="video/mp4">
      Your browser does not support the video tag.
      </video>
			<table width="100%" style="">
				<tr>
					<th class="text2-pxd video-td1-pxd">Xéno PXÐ</th>
					<th class="greentxt time_txt video-td2-pxd">April 2, 2020</th>
				</tr>
			</table>
			</div>
	</div>

	<div class="column2-pxd">

    <table class="pxd t5-pxd">
    <thead>
    <tr>
    <th>Challenge</th>
    <th>Joueur</th>
    <th>Comment</th>
    <th>Score</th>
    <th>Earned Date</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Vous avez gaspillé</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>$16 750</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    <tr>
    <td>Véhicule de test passées</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>3/3</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    </tbody>
    </table>

	</div>
</div>


<h4 class="listing "><span>Niveau 04 : Coloriages</span></h4>

<div class="row-pxd">
					
	<div class="column1-pxd">
      <div class="column1-content-pxd">
			<video class="video-pxd" controls controlsList="nodownload" preload="none" poster="https://2dtcyg.am.files.1drv.com/y4mzD6jd0Ul2vqMz_XUPtfchu8L2QyYhrFYAzJ8pzfcG4MXJRCC37mLAsU6dVlavemfzjUrBVoIRAlvDlqZJ5Jl3TCtxVIgE1PBEqgH3sVtm28MbAKmV5SFR2FJyN2vfKK2EiKH5YTD8aZwCOa1lT4UmULQ-fFOsAhmkmTC8ymIzn-v4HpvHts18CpxI7hsXaJ89yFfKHxCkDv3rBGaOhrFwg?width=3840&height=2160&cropmode=none">
      <source src="https://onedrive.live.com/download?cid=0157F2DFDC7AF879&resid=157F2DFDC7AF879%212219&authkey=AAjt0DN4LBEW4Ms" type="video/mp4">
      Your browser does not support the video tag.
      </video>
			<table width="100%" style="">
				<tr>
					<th class="text2-pxd video-td1-pxd">Xéno PXÐ</th>
					<th class="greentxt time_txt video-td2-pxd">April 2, 2020</th>
				</tr>
			</table>
			</div>
	</div>

	<div class="column2-pxd">

    <table class="pxd t5-pxd">
    <thead>
    <tr>
    <th>Challenge</th>
    <th>Joueur</th>
    <th>Comment</th>
    <th>Score</th>
    <th>Earned Date</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Vous avez gaspillé</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>$27 550</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    <tr>
    <td>Véhicule de test passées</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>6/6</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    </tbody>
    </table>

	</div>
</div>


<h4 class="listing "><span>Niveau 05 : Arches</span></h4>

<div class="row-pxd">
					
	<div class="column1-pxd">
      <div class="column1-content-pxd">
			<video class="video-pxd" controls controlsList="nodownload" preload="none" poster="https://qzkqvw.am.files.1drv.com/y4mUBInpKXGcGbX3mwXMHlc-rrhpCA_v8HW0msaK4QwXUW1RXJhbf9a7BG8ILpQjqTW0N1msY8dwAObgZ_fPAf7tpVVF62PY40j3LoikwuOtuObfO8Gjr5QAxZ6GcU7eV9kNBjE965Ci1zj3CYjIA0LMvnNCf-KRgnDmh1J3fL30X0UmpfuyrHhf3-owVxFqNyMkUm-M6FL6PLOQvRnkI_z4g?width=3840&height=2160&cropmode=none">
      <source src="https://onedrive.live.com/download?cid=0157F2DFDC7AF879&resid=157F2DFDC7AF879%212221&authkey=ACy7R2zzlIEQn5s" type="video/mp4">
      Your browser does not support the video tag.
      </video>
			<table width="100%" style="">
				<tr>
					<th class="text2-pxd video-td1-pxd">Xéno PXÐ</th>
					<th class="greentxt time_txt video-td2-pxd">April 2, 2020</th>
				</tr>
			</table>
			</div>
	</div>

	<div class="column2-pxd">

    <table class="pxd t5-pxd">
    <thead>
    <tr>
    <th>Challenge</th>
    <th>Joueur</th>
    <th>Comment</th>
    <th>Score</th>
    <th>Earned Date</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Vous avez gaspillé</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>$69 850</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    <tr>
    <td>Véhicule de test passées</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>6/6</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    </tbody>
    </table>

	</div>
</div>


<h4 class="listing "><span>Niveau 06 : Quadrillages</span></h4>

<div class="row-pxd">
					
	<div class="column1-pxd">
      <div class="column1-content-pxd">
			<video class="video-pxd" controls controlsList="nodownload" preload="none" poster="https://qzikhq.am.files.1drv.com/y4mlhNoMQdIwt1NXau993DJN6X-v3AnS8Y8tGyz-8Fkl6BhljgF1skIVXcqPNn-_jVGm6hRkDw8HYih-7QncvfRu7YZx6L73ALKhMh7G80HKdkUFl9ajbRicYkVN9ECXTa797-llrt2wY8KdxlPMKhVhNIMaGSCJV4NmAMcTFLzXzkwdmg55LJmaxIB4pTYxQ0QplQTeWlkJEkZYAp_hVMQ1A?width=3840&height=2160&cropmode=none">
      <source src="https://onedrive.live.com/download?cid=0157F2DFDC7AF879&resid=157F2DFDC7AF879%212225&authkey=AJY83C9cYjcyqt4" type="video/mp4">
      Your browser does not support the video tag.
      </video>
			<table width="100%" style="">
				<tr>
					<th class="text2-pxd video-td1-pxd">Xéno PXÐ</th>
					<th class="greentxt time_txt video-td2-pxd">April 2, 2020</th>
				</tr>
			</table>
			</div>
	</div>

	<div class="column2-pxd">

    <table class="pxd t5-pxd">
    <thead>
    <tr>
    <th>Challenge</th>
    <th>Joueur</th>
    <th>Comment</th>
    <th>Score</th>
    <th>Earned Date</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Vous avez gaspillé</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>$35 350</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    <tr>
    <td>Véhicule de test passées</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>10/10</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    </tbody>
    </table>

	</div>
</div>


<h4 class="listing "><span>Niveau 07 : Poussée</span></h4>

<div class="row-pxd">
					
	<div class="column1-pxd">
      <div class="column1-content-pxd">
			<video class="video-pxd" controls controlsList="nodownload" preload="none" poster="https://qzk4sg.am.files.1drv.com/y4mV9NbEbjd41RJIyfprGpnnMUbp5WOrQnP0YJlwEL0FWfu9OZXWuru3K7kafBC_UfK8ut-ePM61r_9Br-mpNxKUuMceXM_loX0EI94_Igd7sPJEMD0uLfKmZBW4USDTvAiRuabngqsI6WQ7kXS4ATGPyBuFBIhlaWLYESyFweBrIVSw6VtXxEmZopP0Ak4vb3Qk6wXCwOxnZqzw1x-3uoqDg?width=1920&height=1080&cropmode=none">
      <source src="https://onedrive.live.com/download?cid=0157F2DFDC7AF879&resid=157F2DFDC7AF879%212226&authkey=AA6U6D2GrOp2fG4" type="video/mp4">
      Your browser does not support the video tag.
      </video>
			<table width="100%" style="">
				<tr>
					<th class="text2-pxd video-td1-pxd">Xéno PXÐ</th>
					<th class="greentxt time_txt video-td2-pxd">April 2, 2020</th>
				</tr>
			</table>
			</div>
	</div>

	<div class="column2-pxd">

    <table class="pxd t5-pxd">
    <thead>
    <tr>
    <th>Challenge</th>
    <th>Joueur</th>
    <th>Comment</th>
    <th>Score</th>
    <th>Earned Date</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Vous avez gaspillé</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>$29 700</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    <tr>
    <td>Véhicule de test passées</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>5/5</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    </tbody>
    </table>

	</div>
</div>


<h4 class="listing "><span>Niveau 08 : Chute libre</span></h4>

<div class="row-pxd">
					
	<div class="column1-pxd">
      <div class="column1-content-pxd">
			<video class="video-pxd" controls controlsList="nodownload" preload="none" poster="https://dh594g.am.files.1drv.com/y4mHdzkmXbVPpXufUkT9PBwezUvQmGvchKHJJBjX15vHzA6_gMGz1mCrIJ1sAi0gUlw_l5Rp-j1yPcXlJ8J3R1QNsn1gMnUCU9A8tggn8u_rPvGB4OITGIrh9ZzqJUfbYX3D09vIBJA3OHmkeeE-pGjhBuW-kJUfmE4gXz8m-ZVuCoa2-1zRQbog98mKQdRid9YehGdyfm-KLMThujxF88pEg?width=1920&height=1080&cropmode=none">
      <source src="https://onedrive.live.com/download?cid=0157F2DFDC7AF879&resid=157F2DFDC7AF879%212230&authkey=ACykmoVNjZOox6M" type="video/mp4">
      Your browser does not support the video tag.
      </video>
			<table width="100%" style="">
				<tr>
					<th class="text2-pxd video-td1-pxd">Xéno PXÐ</th>
					<th class="greentxt time_txt video-td2-pxd">April 2, 2020</th>
				</tr>
			</table>
			</div>
	</div>

	<div class="column2-pxd">

    <table class="pxd t5-pxd">
    <thead>
    <tr>
    <th>Challenge</th>
    <th>Joueur</th>
    <th>Comment</th>
    <th>Score</th>
    <th>Earned Date</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Vous avez gaspillé</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>$26 950</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    <tr>
    <td>Véhicule de test passées</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>5/5</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    </tbody>
    </table>

	</div>
</div>


<h4 class="listing "><span>Niveau 09 : Super bouton de super collision</span></h4>

<div class="row-pxd">
					
	<div class="column1-pxd">
      <div class="column1-content-pxd">
			<video class="video-pxd" controls controlsList="nodownload" preload="none" poster="https://dh6ekq.am.files.1drv.com/y4m-gmO2uiaK6yUHs3jkBxwEdLJj2xdveqdbEGXsA5ihX8QXtU-1oNhzEHK3qveW7c04agTLqsnsd1cnlqH-e9NlL0YYo-4BXpMSBLI7bgQ6_QiEOjSOtHU8gRblpbUJr0hTn0Ucy41F09cVTsZRKp3rWb5LjzxdHq72uLYJ1ATN_cM8B6yynVOwKRmgwPeXmjsq8qh9xPDy1K01npVILuZVQ?width=1920&height=1080&cropmode=none">
      <source src="https://onedrive.live.com/download?cid=0157F2DFDC7AF879&resid=157F2DFDC7AF879%212232&authkey=ADDQFgNbcu11sFk" type="video/mp4">
      Your browser does not support the video tag.
      </video>
			<table width="100%" style="">
				<tr>
					<th class="text2-pxd video-td1-pxd">Xéno PXÐ</th>
					<th class="greentxt time_txt video-td2-pxd">April 2, 2020</th>
				</tr>
			</table>
			</div>
	</div>

	<div class="column2-pxd">

    <table class="pxd t5-pxd">
    <thead>
    <tr>
    <th>Challenge</th>
    <th>Joueur</th>
    <th>Comment</th>
    <th>Score</th>
    <th>Earned Date</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Vous avez gaspillé</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>$18 600</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    <tr>
    <td>Véhicule de test passées</td>
    <td>Xéno PXÐ</td>
    <td></td>
    <td>5/5</td>
    <td><span class="trophy-earned-timestamp greentxt time_txt">April 2, 2020</span></td>
    </tr>
    </tbody>
    </table>

	</div>
</div>

</div>



`;
    
    
    $gamePage.html(content);
    //let heightGamePage = Number($gamePage.css("height").replace("px",""));
    

  });


  console.log("displayScoreDetail END");
}






// CSS

function addCSS() {
  
  console.log("addCSS START");
  let css = `

.font-pxd {
	font-family: open sans,trebuchet MS,Verdana !important;
}

.video-pxd {
	width:100%;
	padding-bottom:0px;
}

.row-pxd {
  display: flex;
  flex-wrap: wrap;
  /* padding: 0 4px; */
}

/* Create four equal columns that sits next to each other */
.column-pxd {
  /*max-width: 25%;
  padding: 0 4px;*/
}

.column1-pxd {
	flex: 35%;
	padding:0 15px 0 15px;
	width:100%;
}

.column1-content-pxd {
	background-color:#EEEEEE;
}

.column2-pxd {
	flex: 65%;
	width:100%;
}


.text1-pxd {
 font-size:12px;
 color:#000;
 font-family:open sans,trebuchet MS,Verdana !important;
 font-weight:400
}

.text2-pxd {
 font-size:11px;
 color:#000;
 font-family:open sans,trebuchet MS,Verdana !important;
 font-weight:400
}

.a-actived {
color: #c95556 !important;
display: block;
background-color: #000;
padding: 5px;
}

.a-no-actived {
color: #e9eae2 !important;
background-color: transparent !important;
}


th.video-td1-pxd {
	vertical-align:top;
	padding-left:10px;
	padding-bottom:5px;
}

th.video-td2-pxd {
	vertical-align:top;
	font-size:10px !important;
	text-align:right;
	font-weight:400;
	padding-right:10px;
	padding-bottom:5px;
}

table.pxd {
width:100%;
font-size:12px;
color:#000;
font-family:open sans,trebuchet MS,Verdana !important;
font-weight:400
}

table.pxd th {
	font-family:open sans,trebuchet MS,Verdana !important;
}

table.pxd td {
	font-family:open sans,trebuchet MS,Verdana !important;
}

	table.t4-pxd thead th:nth-child(1){
       width:28%;
		}

		table.t4-pxd thead th:nth-child(2){
       width:12%;
		}

		table.t4-pxd thead th:nth-child(3){
      width:28%;
			text-align : left;
			padding-right: 10px;
		}

		table.t4-pxd thead th:nth-child(4){
			text-align : right;
			padding-right: 15px;
		}

		t5-score-pxd {
			vertical-align:top;
			text-align:right;
			padding-right: 10px;
		}

		table.t5-pxd thead th:nth-child(1){
       width:28%;
		}

		table.t5-pxd thead th:nth-child(2){
       width:12%;
		}

		table.t5-pxd thead th:nth-child(3){
       width:28%;
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


`;

  $("<style type='text/css'> " + css + " </style>").appendTo("head");
  console.log("addCSS END");
}