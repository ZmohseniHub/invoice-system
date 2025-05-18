import type { ReactNode } from "react";


interface GenericTableProps {
  headers: ReactNode[];
  rows: ReactNode[][];
  className?: string;
  emptyMessage?: string;
  footer?: ReactNode;
}

const GenericTable = ({
  headers,
  rows,
  className = "",
  emptyMessage = "داده‌ای برای نمایش وجود ندارد",
  footer,
}: GenericTableProps) => {



  return (
    <div className={`w-full py-4 md:py-6 overflow-x-auto ${className}`}>
      {rows.length > 0 ? (
        <div>
          <table className="w-full min-w-[800px] table-fixed border-collapse border border-slate-400 rounded text-center text-sm md:text-base">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th 
                    key={index} 
                    className="border border-slate-400 py-2 min-w-[100px] text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="text-center">
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className="border border-slate-400 min-w-[100px] text-center"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {footer && (
            <div className="w-full flex items-center justify-center my-7 py-2 sm:text-xl border-b border-slate-700">
              {footer}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-slate-700">{emptyMessage}</p>
      )}
    </div>
  );
};

export default GenericTable;