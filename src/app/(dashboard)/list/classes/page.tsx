import React from 'react'
import TableSearch from '@/app/components/TableSearch'
import Image from 'next/image'
import { role, classesData } from '@/lib/data'
import Pagination from '@/app/components/Pagination'
import Table from '@/app/components/Table'
import Link from 'next/link'
import FormModal from '@/app/components/FormModal'



type Class = {
    id: number;
    name: string;
    capacity: number;
    grade: number;
    supervisor: string
};

const columns = [
    {
        header: "Class Name",
        accessor: "name",
    },
    {
        header: "Capacity",
        accessor: "capacity",
        className: "hidden md:table-cell",
    },
    {
        header: "Grade",
        accessor: "grade",
        className: "hidden md:table-cell",
    },
    {
        header: "Supervisor",
        accessor: "supervisor",
        className: "hidden sm:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const ClassListPage = () => {

    const renderRow = (item: Class) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 border-solid even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-sm text-gray-500 font-semibold">#{item.id}</p>
                    <h3 className="font-semibold">{item.name}</h3>
                </div>
            </td>

            <td className="hidden md:table-cell align-middle">{item.capacity}</td>
            <td className="hidden md:table-cell align-middle">{item.grade}</td>
            <td className="hidden sm:table-cell align-middle">{item.supervisor}</td>

            <td className='align-middle'>
                <div className="flex items-center gap-2">
                    <Link href={`/list/classes/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                            <Image src="/view.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    {role === "admin" && (
                        <>
                            <FormModal table="class" type="update" data={item} />
                            <FormModal table="class" type="delete" id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Class</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role === "admin" && (
                            <FormModal table="class" type="create" />
                        )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={classesData} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    );
};

export default ClassListPage