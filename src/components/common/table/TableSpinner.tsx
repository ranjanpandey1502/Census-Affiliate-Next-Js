import Spinner from "../Spinner";

export default function TableSpinner() {
  return (
    <tbody>
      <tr>
        <td colSpan={999} className="py-10 lg:py-20 text-center">
          <div className="text-blue-500 flex items-center justify-center lg:h-60 max-h-30">
            <Spinner />
          </div>
        </td>
      </tr>
    </tbody>
  );
}
