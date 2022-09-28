// Map initialization
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5
})
map.setView( [0,0], 1);

var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

var popupTap = '<div>' +
                '<div>Potencia inicial</div>'+
                '<div>US = <input class="nkn-input" id="us" type="number"></div>' +
                '<div>DS = <span id="splitter-2-US">40</span></div>' +
            '</div>';

var popupCable = '<div>' +
                        '<div>Distancia de acometida(m)</div>'+
                        '<div><input class="nkn-input" id="us" type="number"></div>' +
                    '</div>';

var popupSplitter2 = '<div>' +
                        '<div>' +
                            '<div>Input</div>' + 
                            '<div>US = <span id="">40</span></div>' +
                            '<div>DS = <span id="">40</span></div>' +
                        '</div>' +
                        '<div>' +
                            '<div>Output A</div>' +
                            '<div>US = <span id="">40</span></div>' +
                            '<div>DS = <span id="">40</span></div>' +
                        '</div>' +
                        '<div>' +
                            '<div>Output B</div>' +
                            '<div>US = <span id="">40</span></div>' +
                            '<div>DS = <span id="">40</span></div>' +
                        '</div>' +
                    '</div>';  

//tools
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<div class="tools">'+
                            '<img id = "tap" src="assets/images/tap.png"/>'+  
                            '<img id = "cable" src="assets/images/cable.png"/>'+  
                            '<img id = "splitter-2" src="assets/images/splitter-2.png"/>'+
                            '<img id = "splitter-3" src="assets/images/splitter-3.png"/>'+
                            '<img id = "dvr" src="assets/images/dvr.png"/>'+
                            '<img id = "router" src="assets/images/router.png"/>'                                                       
                          '</div>';
};

info.addTo(map);

var tools = document.querySelectorAll('.tools img');

var tap = tools[0];
var cable = tools[1];
var splitter2 = tools[2];
var splitter3 = tools[3];
var dvr = tools[4];
var router = tools[5];

tap.addEventListener('click', componentTap);
cable.addEventListener('click', componentCable);
splitter2.addEventListener('click', componentSplitter2);

function componentTap(e){
    //create marker
    let marker = new L.marker(
        {lat: 0, lng: e.clientX - 1200},
        {icon: new LeafIcon({iconUrl: 'assets/images/' + e.target.id + '.png'}), draggable:'true'}
        
    );    

    //create popup
    let popup = L.popup().setContent(popupTap);
    marker.bindPopup(popup);

    marker.addTo(map); 
}

function componentCable(e){
    //create marker
    let marker = new L.marker(
        {lat: 0, lng: e.clientX - 1200},
        {icon: new LeafIcon({iconUrl: 'assets/images/' + e.target.id + '.png'}), draggable:'true'}        
    );    

    //create popup
    let popup = L.popup().setContent(popupCable);
    marker.bindPopup(popup);

    //remember value
    marker.on('click', function(ev){
        let popupTap = ev.target._popup._contentNode;
        let input = popupTap.querySelectorAll('input')[0];        
        let idInput = ev.target._leaflet_id + input.id;
        let existsValue = localStorage.getItem(idInput);
        input.value = existsValue;
        input.addEventListener('change', function(){
            console.log(input.value)
            localStorage.setItem(idInput,input.value);
        })
    })
    
    marker.addTo(map); 
}
map.on('click', function(e) {
    console.log({lat: e.latlng.lat, lng: e.latlng.lng})
});

function componentSplitter2(e) {        
    //create marker
    let marker = new L.marker(
        {lat: 0, lng: e.clientX - 1200},
        {icon: new LeafIcon({iconUrl: 'assets/images/' + e.target.id + '.png'}), draggable:'true'}
        
    );
    //create popup
    let popup = L.popup().setContent(popupSplitter2);
    marker.bindPopup(popup);

    marker.addTo(map);     
}

let  marker1 = new L.marker([0,0]).addTo(map);
let popup1 = L.popup().setContent('marker1');
marker1.bindPopup(popup1).addTo(map);

let  marker2 = new L.marker([0,100]).addTo(map);
let popup2 = L.popup().setContent('marker2');
marker2.bindPopup(popup2).addTo(map);

var latlngs = [
    [0,0],
    [0,100]
];

var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
let popup3 = L.popup().setContent('cable');
polyline.bindPopup(popup3).addTo(map);

polyline.addEventListener('click', ftest);
function ftest(e){
    console.log(e)
    let popup3 = L.popup().setContent('cable');
}