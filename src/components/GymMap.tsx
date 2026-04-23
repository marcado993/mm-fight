"use client";
import { useRef, useCallback, useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  MapRef,
  MapLayerMouseEvent,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export interface GymMarker {
  id: string;
  name: string;
  city: string;
  province: string;
  lat: number;
  lng: number;
  reputationScore: number;
  activeFighters: number;
  koRate: number;
}

interface GymMapProps {
  gyms: GymMarker[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

// Free dark style from OpenFreeMap (no token needed)
const MAP_STYLE = "https://tiles.openfreemap.org/styles/dark";

export default function GymMap({ gyms, activeId, onSelect }: GymMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [popupGym, setPopupGym] = useState<GymMarker | null>(null);

  const handleMarkerClick = useCallback(
    (gym: GymMarker) => {
      setPopupGym(gym);
      onSelect?.(gym.id);
      mapRef.current?.flyTo({
        center: [gym.lng, gym.lat],
        zoom: 14,
        pitch: 55,
        bearing: -20,
        duration: 1400,
        essential: true,
      });
    },
    [onSelect]
  );

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: -78.5,
        latitude: -1.8,
        zoom: 5.5,
        pitch: 45,
        bearing: 0,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle={MAP_STYLE}
      onLoad={(e) => {
        const map = e.target;

        // 3D building extrusion layer
        if (!map.getLayer("3d-buildings")) {
          map.addLayer({
            id: "3d-buildings",
            source: "openmaptiles",
            "source-layer": "building",
            type: "fill-extrusion",
            minzoom: 13,
            paint: {
              "fill-extrusion-color": [
                "interpolate",
                ["linear"],
                ["get", "render_height"],
                0,  "#1a0303",
                50, "#2a0505",
                200, "#d32f2f",
              ],
              "fill-extrusion-height": ["get", "render_height"],
              "fill-extrusion-base": ["get", "render_min_height"],
              "fill-extrusion-opacity": 0.75,
            },
          });
        }
      }}
    >
      <NavigationControl position="bottom-right" showCompass showZoom />

      {/* Gym Markers */}
      {gyms.map((gym) => {
        const isActive = gym.id === activeId;
        return (
          <Marker
            key={gym.id}
            longitude={gym.lng}
            latitude={gym.lat}
            anchor="bottom"
            onClick={() => handleMarkerClick(gym)}
          >
            <div
              title={gym.name}
              style={{
                cursor: "pointer",
                transform: isActive ? "scale(1.25)" : "scale(1)",
                transition: "transform 0.25s ease",
                filter: isActive
                  ? "drop-shadow(0 0 12px rgba(211,47,47,0.9))"
                  : "drop-shadow(0 2px 6px rgba(0,0,0,0.7))",
              }}
            >
              {/* Octagon marker */}
              <div style={{
                width: isActive ? 44 : 36,
                height: isActive ? 44 : 36,
                background: isActive
                  ? "var(--color-primary, #d32f2f)"
                  : "#1c1c1c",
                border: `3px solid ${isActive ? "#ff6b6b" : "#d32f2f"}`,
                clipPath: "polygon(22% 0%, 78% 0%, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0% 78%, 0% 22%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isActive ? 18 : 14,
                lineHeight: 1,
              }}>
                🥊
              </div>
              {/* Label */}
              <div style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                background: isActive ? "#d32f2f" : "rgba(10,10,10,0.85)",
                border: `1px solid ${isActive ? "#ff6b6b" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 99,
                padding: "2px 8px",
                fontFamily: "'Lexend', sans-serif",
                fontWeight: 800,
                fontSize: 9,
                color: "white",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                backdropFilter: "blur(4px)",
              }}>
                {gym.name.split(" ")[0]}
              </div>
            </div>
          </Marker>
        );
      })}

      {/* Popup */}
      {popupGym && (
        <Popup
          longitude={popupGym.lng}
          latitude={popupGym.lat}
          anchor="top"
          offset={[0, 12]}
          closeOnClick={true}
          onClose={() => setPopupGym(null)}
          style={{ padding: 0 }}
          className="gym-popup-maplibre"
        >
          <div style={{
            background: "#0d0d0d",
            border: "1px solid rgba(211,47,47,0.5)",
            borderRadius: 14,
            padding: "14px 16px",
            minWidth: 200,
            fontFamily: "'Lexend', sans-serif",
          }}>
            <div style={{ fontWeight: 900, fontSize: 14, color: "white", marginBottom: 2 }}>{popupGym.name}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 12 }}>📍 {popupGym.city}, {popupGym.province}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {[
                { label: "REP",     value: popupGym.reputationScore, color: "#eab308" },
                { label: "KO%",     value: `${popupGym.koRate}%`,    color: "#d32f2f" },
                { label: "FIGHTERS",value: popupGym.activeFighters,  color: "#22c55e" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  background: "#1c1c1c", borderRadius: 8,
                  padding: "8px 6px", textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ fontWeight: 900, fontSize: 16, color, marginBottom: 2 }}>{value}</div>
                  <div style={{ fontSize: 8, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
