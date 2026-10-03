import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { Branch } from "@/lib/data";
import "leaflet/dist/leaflet.css";

function pinIcon(active: boolean) {
  const fill = active ? "#1a1520" : "#c5a059";
  const stroke = active ? "#c5a059" : "#1a1520";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
      <circle cx="14" cy="14" r="5" fill="#fff"/>
    </svg>`;
  return L.divIcon({
    className: "",
    html: svg,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
  });
}

function MapFocus({ branch }: { branch: Branch }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([branch.lat, branch.lng], 14, { duration: 0.7 });
  }, [branch, map]);
  return null;
}

type Props = {
  branches: Branch[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function BranchMap({ branches, selectedId, onSelect }: Props) {
  const selected = branches.find((b) => b.id === selectedId) ?? branches[0]!;
  const center: [number, number] = [selected.lat, selected.lng];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full min-h-[360px] w-full rounded-2xl"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapFocus branch={selected} />
      {branches.map((b) => (
        <Marker
          key={b.id}
          position={[b.lat, b.lng]}
          icon={pinIcon(b.id === selectedId)}
          eventHandlers={{ click: () => onSelect(b.id) }}
        />
      ))}
    </MapContainer>
  );
}
