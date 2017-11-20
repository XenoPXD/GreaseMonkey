// ==UserScript==
// @name        Wiki Loves Monuments : Compute distances
// @namespace   wlmcd
// @description Ajoute une colonne dans le tableau des monuments pour calculer la distance entre le monument et un lieu
// @include     https://fr.wikipedia.org/wiki/Liste_des_monuments_historiques*
// @version     1
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
 
//$('[id^="google"]').hide();
//$("#ad").hide();
 
// http://red-team-design.developpez.com/tutoriels/css/donner-style-listes-deroulantes/
 
console.log("Wiki Loves Monuments : Compute distances | start");
 
var rgxOrientation = /(nord|sud|est|ouest)/;
var rgxDegres = /(\d*)?°/;
var rgxMinutes = /°?(\d*)?[\'']/;
var rgxSecondes = /\'?(\d*)?[\"?]/;
 
var css = "<style> #calculDistance {background-image: -moz-linear-gradient(top, #F1F1F1, #CFCFCF);}  #calculDistance:hover { background-image: -moz-linear-gradient(top, #d8d8d8, #b6b6b6); } </style>";
var formLocalisation = "<div id='pxd' style='background-color: /*ButtonFace*/ rgb(246, 246, 246) ;padding:6px 6px;margin-top:8px;border:solid 1px rgb(216, 216, 216);'>Calcule les distances entre la localisation et les monuments : <input type='text' name='latitude' style='border:solid 1px rgb(170,170,170);padding-left:4px;' placeholder='Nord [Sexagésimal]' value='43° 28' 45?'/>&nbsp;<select name='or1' style='border:solid 1px rgb(170,170,170);'><option value='N'>N</option><option value='S'>S</option></select>&nbsp;<input type='text' name='longitude' value='1° 23' 59?' placeholder='Est [Sexagésimal]' style='border:solid 1px rgb(170,170,170);padding-left:4px;'/>&nbsp;<span class='custom-dropdown custom-dropdown--white'><select name='or2' class='custom-dropdown__select custom-dropdown__select--white' style='border:solid 1px rgb(170,170,170);'><option value='E'>E</option><option value='O'>O</option></select></span>&nbsp;<button id='calculDistance' style='/*background-color: ButtonFace ;*//*rgb(246, 246, 246); *//* Green *//*border: none;*/color: rgb(16,115,166);padding: 0px 4px 2px 4px;border:solid 1px rgb(170,170,170);cursor:pointer;border-radius: 5px;vertical-align:top;text-align: center;text-decoration: none;display: inline-block;/*font-size: 16px;*/' >Calculer</button></div>";
var titreTableau = "<th class='headerSort' scope='col' tabindex='0' role='columnheader button' title='Tri croissant'>Distance</br>(en Km)</th>";
var nbrCol;
var colCoordonnees;
var table;
var colDistance;
var thCoordonnees;
 
$("head").append(css);
 
var cols = $("th").each(function( index ) {
if ( $(this).text() ==  "Coordonnées" ) {
    table = $(this).parent().parent().parent();
    colCoordonnees = index;
    colDistance = index+1;
    thCoordonnees = $(this);
    //$(this).after("<th class='headerSort' scope='col' tabindex='0' role='columnheader button' title='Tri croissant'>Distance (en Km)</th>");
    $(this).after(titreTableau);
    $(table).before(formLocalisation);
  }
});
 
nbrCol = $(table).find("th").length;
 
 
$(table).find("td").each(function( index ) {
  //console.log( index + ": " + (index % (nbrCol-1)) + " : " + $( this ).text() );
  if ((index % (nbrCol-1)) == (colCoordonnees-1) ) {
    $(this).after("<td style='text-align:center;'>non calculé</td>");
  }
 
});
 
$( "#calculDistance" ).click(function( event ) {
  event.preventDefault();
 
  //$(thCoordonnees).after(titreTableau);
 
  //alert("ok2");
  // 43° 28' 45? nord, 1° 23' 59? est
  var latitude = $("input[name='latitude']").val();
  var longitude = $("input[name='longitude']").val();
 
  var latDepart = new Object();
  latDepart.orientation = $("select[name='or1']").val();
  latDepart.degres = parseInt(rgxDegres.exec(latitude)[1], 10);
  latDepart.minutes = parseInt(rgxMinutes.exec(latitude)[1], 10);
  latDepart.secondes = parseInt(rgxSecondes.exec(latitude)[1], 10);
 
  var longDepart = new Object();
  longDepart.orientation = $("select[name='or2']").val();
  longDepart.degres = rgxDegres.exec(longitude)[1];
  longDepart.minutes = rgxMinutes.exec(longitude)[1];
  longDepart.secondes = rgxSecondes.exec(longitude)[1];
 
  var coordDepart = new Object();
  coordDepart.latitude = latDepart;
  coordDepart.longitude = longDepart;
  var absdlat = Math.abs( Math.round(latDepart.degres * 1000000.));
  var absmlat = Math.abs(Math.round(latDepart.minutes * 1000000.));
  var absslat = Math.abs(Math.round(latDepart.secondes * 1000000.));
  coordDepart.latDec = Math.round(absdlat + (absmlat/60.) + (absslat/3600.) ) /1000000;
  if (latDepart.orientation == "S") coordDepart.latDec = coordDepart.latDec * -1;
  var absdlon = Math.abs( Math.round(longDepart.degres * 1000000.));
  var absmlon = Math.abs(Math.round(longDepart.minutes * 1000000.));
  var absslon = Math.abs(Math.round(longDepart.secondes * 1000000.));
  coordDepart.longDec = Math.round(absdlon + (absmlon/60) + (absslon/3600) ) /1000000;
  if (longDepart.orientation == "O") coordDepart.longDec = coordDepart.longDec * -1;
 
  console.log(coordDepart);
 
  var coordonneesArrive;
  $(table).find("td").each(function( index ) {
   
    //console.log( index + ": " + (index % (nbrCol)) + " : " + $( this ).text() );
   
    if ( (index % (nbrCol)) == (colCoordonnees-1) ) {
       coordonneesArrive = null;
       try {
          coordonneesArrive = parserCoordonneesSexagésimal($(this).find("a").text());
       } catch (e) {
          console.log("calculDistance : " + e);
       }
    }
   
    if ((index % (nbrCol)) == (colDistance-1) ) {
        try {
          var distance = getDistanceFromLatLonInKm(coordDepart.latDec, coordDepart.longDec, coordonneesArrive.latDec, coordonneesArrive.longDec);
          $(this).css("text-align", "right");
          $(this).text(kFormatter(distance));
        } catch (e) {
          $(this).css("text-align", "center");
          $(this).text("non calculé");
          console.log("calculDistance : " + e);
        }
      //console.log("distance : " + distance);
    }
 
  });
 
  
});
 
function kFormatter(num) {
  var out = "&nbsp;";
  if (num>=0) {
    out = num.toFixed(2) + "";
  }
  return out;
}
 
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}
 
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
 
//$("#calculDistance").click(calculerDistance);
console.log("nbrCol : " + nbrCol);
console.log("colCoordonnees : " + colCoordonnees);
console.log("ColDistance : " + colDistance);
 
function parserCoordonneesSexagésimal(val) {
 
 
  var coordonnees = val.split(",");
  var latitudeInput = coordonnees[0];
  var longitudeInput = coordonnees[1];
 
  //console.log("latitudeInput : " + latitudeInput);
  //console.log("longitudeInput : " + longitudeInput);
 
  var latArrive = new Object();
  latArrive.orientation = rgxOrientation.exec(latitudeInput)[1];
  latArrive.degres = rgxDegres.exec(latitudeInput)[1];
  latArrive.minutes = rgxMinutes.exec(latitudeInput)[1];
  latArrive.secondes = rgxSecondes.exec(latitudeInput)[1];
 
  var longArrive = new Object();
  longArrive.orientation = rgxOrientation.exec(longitudeInput)[1];
  longArrive.degres = rgxDegres.exec(longitudeInput)[1];
  longArrive.minutes = rgxMinutes.exec(longitudeInput)[1];
  longArrive.secondes = rgxSecondes.exec(longitudeInput)[1];
 
  var coordonneesArrive = new Object();
  coordonneesArrive.latitude = latArrive;
  coordonneesArrive.longitude = longArrive;
  var absdlat = Math.abs( Math.round(latArrive.degres * 1000000.));
  var absmlat = Math.abs(Math.round(latArrive.minutes * 1000000.));
  var absslat = Math.abs(Math.round(latArrive.secondes * 1000000.));
  coordonneesArrive.latDec = Math.round(absdlat + (absmlat/60.) + (absslat/3600.) ) /1000000;
  if (latArrive.orientation == "sud") coordonneesArrive.latDec = coordonneesArrive.latDec * -1;
  var absdlon = Math.abs( Math.round(longArrive.degres * 1000000.));
  var absmlon = Math.abs(Math.round(longArrive.minutes * 1000000.));
  var absslon = Math.abs(Math.round(longArrive.secondes * 1000000.));
  coordonneesArrive.longDec = Math.round(absdlon + (absmlon/60) + (absslon/3600) ) /1000000;
  if (longArrive.orientation == "ouest") coordonneesArrive.longDec = coordonneesArrive.longDec * -1;
 
  return coordonneesArrive;
 
}
 
// Coordonnées
function Latitude() {
  var N = "nord|north|norden";
  this.orientation;
  this.degres;
  this.minutes;
  this.secondes;
}
 
function Longitude() {
  this.orientation;
  this.degres;
  this.minutes;
  this.secondes;
}
 
 
function Coordonnées() {
  this.nom = nom;
}
 
Coordonnées.prototype.getLatitudeDecimal = function() {
  console.log("Bonjour, je suis " + this.nom);
};
 