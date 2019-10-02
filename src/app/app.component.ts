import {Component, OnInit} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import {Deck} from '@deck.gl/core';

// mapboxgl.accessToken = 'Set your accessToken here';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private deck: Deck;
  private map: mapboxgl.Map;
  private INITIAL_VIEW_STATE = {
    latitude: 51.47,
    longitude: 0.45,
    zoom: 4,
    bearing: 0,
    pitch: 30
  };


  public initDeck() {
    this.map = new mapboxgl.Map({
      container: 'georeport-map',
      style: 'mapbox://styles/mapbox/light-v9',
      interactive: false,
      center: [this.INITIAL_VIEW_STATE.longitude, this.INITIAL_VIEW_STATE.latitude],
      zoom: this.INITIAL_VIEW_STATE.zoom,
      pitch: this.INITIAL_VIEW_STATE.pitch
    });
    this.deck = new Deck({
      canvas: 'georeport-deck-canvas',
      initialViewState: this.INITIAL_VIEW_STATE,
      controller: true,
      width: '100%',
      height: '100%',
      onViewStateChange: ({viewState}) => {
        this.map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch
        });
      },
      layers: [],
    });

  }

  ngOnInit(): void {
    if (this.isMapboxTokenSet) {
      this.initDeck();
    }

  }

  public get isMapboxTokenSet(): boolean {
    return !!mapboxgl.accessToken;
  }
}
