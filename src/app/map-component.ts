
import { Maps, Legend, MapAjax, Zoom, MapsTooltip } from '@syncfusion/ej2-maps';
Maps.Inject(Zoom, Legend, MapsTooltip);

export function mapsComponent(): Maps {
    let maps: Maps = new Maps({
        height: "266px",
        width: "570px",
        zoomSettings: {
            enable: false,
            zoomFactor: 7,
            pinchZooming: false
        },
        legendSettings: {
            visible: false
        },
        layers: [
            {
                shapeData: new MapAjax('src/app/worldmap.json'),
                shapeSettings: {
                    autofill: true
                },
                dataLabelSettings: {
                    visible: true,
                    labelPath: 'name',
                    smartLabelMode: 'Trim'
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name'
                }
            },
        ],
    });

    return maps;
}

