export default function ModalText({ text }: { text: string }) {
  return (
    <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">{text}</p>
  );
}
