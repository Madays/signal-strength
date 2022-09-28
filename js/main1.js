// Map initialization
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5
});

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

var popupSplitter3 = '<div>' +
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
                        '<div>' +
                            '<div>Output C</div>' +
                            '<div>US = <span id="">40</span></div>' +
                            '<div>DS = <span id="">40</span></div>' +
                        '</div>' +
                    '</div>';

var popupDvr = '<div>' +
                        '<div>US = <span id="">40</span></div>' +
                        '<div>DS = <span id="">40</span></div>' +
                    '</div>';

var popupRouter = '<div>' +
                         '<div>US = <span id="">40</span></div>' +
                            '<div>DS = <span id="">40</span></div>' +
                    '</div>';

var myStyle =
{
    fillColor: '#1c9099',
    color: 'white',
    weight: 10
};
var circuit = [];

var greenIcon = L.icon({
    iconUrl: 'assets/images/point-path.svg',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [38, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
//L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
function markerPathPoint(e,xPointPath,yPointPath){
    var markerPathPoint = new L.marker(
        {lat: e.latlng.lat + yPointPath, lng: e.latlng.lng + xPointPath},
        {icon: greenIcon}        
    );   
    markerPathPoint.on('click', function(ev){
        if(circuit.length<3){
            circuit.push([ev.latlng.lat,ev.latlng.lng])
        }
        if(circuit.length == 2) {
            let popup = L.popup().setContent(popupCable);
            L.polyline(circuit).setStyle(myStyle).bindPopup(popup).addTo(map);
            circuit = [];
        }
    })

    
    return markerPathPoint;
}

function componentTap(idComponent,e){
    //create marker
    var marker = new L.marker(
        e.latlng,
        {icon: new LeafIcon({iconUrl: 'assets/images/' + idComponent + '.png'}), 
        draggable:'true'}        
    );    
    
    
    //create popup
    let popup = L.popup().setContent(popupTap);
    marker.bindPopup(popup);
    marker.addTo(map); 
    
    markerPathPoint(e,20,0).addTo(map);
    
}

function componentSplitter2(idComponent,e) {  
    //create marker
    let marker = new L.marker(
        e.latlng,
        {icon: new LeafIcon({iconUrl: 'assets/images/' + idComponent + '.png'}), draggable:'true'}
    );
    markerPathPoint(e,-20,0).addTo(map);
    markerPathPoint(e,20,-20).addTo(map);
    markerPathPoint(e,20,20).addTo(map);
    //create popup
    let popup = L.popup().setContent(popupSplitter2);
    marker.bindPopup(popup);
    marker.addTo(map);   
        
}

function componentSplitter3(idComponent,e) {        
    //create marker component
    let marker = new L.marker(
        e.latlng,
        {icon: new LeafIcon({iconUrl: 'assets/images/' + idComponent + '.png'}), draggable:'true'}
        
    );
    //create popup
    let popup = L.popup().setContent(popupSplitter3);
    marker.bindPopup(popup);
    marker.addTo(map);    
    //create marker path point
    markerPathPoint(e,-20,0).addTo(map);
    markerPathPoint(e,20,-20).addTo(map);
    markerPathPoint(e,20,0).addTo(map);
    markerPathPoint(e,20,20).addTo(map);
}

function componentDvr(idComponent,e) {
    //create marker
    let marker = new L.marker(
        e.latlng,
        {icon: new LeafIcon({iconUrl: 'assets/images/' + idComponent + '.png'}), draggable:'true'}
        
    );
    //create popup
    let popup = L.popup().setContent(popupDvr);
    marker.bindPopup(popup);
    marker.addTo(map);    

    //create marker path point
    markerPathPoint(e,-20,0).addTo(map);
}

function componentRouter(idComponent,e) {
    //create marker
    let marker = new L.marker(
        e.latlng,
        {icon: new LeafIcon({iconUrl: 'assets/images/' + idComponent + '.png'}), draggable:'true'}        
    );

    //create popup
    let popup = L.popup().setContent(popupRouter);
    marker.bindPopup(popup);
    marker.addTo(map);    

    //create marker path point
    markerPathPoint(e,-20,0).addTo(map);
}
//id component of circuit
var idComponent;
var toolBox = document.querySelectorAll('.tools img');
toolBox.forEach( tool => {
    tool.addEventListener('click', function(e){
        idComponent = e.target.id;
        return idComponent;
    })
})

map.on('click', function(e){
    switch(idComponent) {
        case 'tap':
            componentTap(idComponent,e);
            idComponent = null;
            break;
        case 'splitter-2':
            componentSplitter2(idComponent,e)
            idComponent = null;                        
            break;
        case 'splitter-3':
            console.log('splitter-3');
            componentSplitter3(idComponent,e)
            idComponent = null;
            break;
        case 'dvr':
            componentDvr(idComponent,e)
            idComponent = null;
            console.log(circuit)
            break;
        case 'router':
            console.log('router')
            componentRouter(idComponent,e)
            idComponent = null;
            break;
        default:
          // code block
    }                    
})




