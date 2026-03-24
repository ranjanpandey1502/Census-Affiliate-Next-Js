function getAvatarHashColor(fullName: string) {
  let hash = 0;

  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash → HSL color
  const hue = Math.abs(hash) % 360;
  const color = `hsl(${hue}, 60%, 38%)`;
  return color;
}
export default function AvatarProfile({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string;
}) {
  const fullName = `${first_name} ${last_name}`;
  const hashColor = getAvatarHashColor(fullName);

  const initials = `${first_name[0]}${last_name[0]}`;
  return <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{backgroundColor: hashColor}}>
    {initials}
  </div>
}
