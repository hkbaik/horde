import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StoragePieChart = ({data}) => {

    const allocated = [
        { name: 'Allocated', value: data.reduce((acc, d) => acc+d.value,0)}
    ];
    return (

        <PieChart width={250} height={250}>
            <Pie
                dataKey={'value'}
                cx={100}
                cy={100}
                data={allocated}
                innerRadius={20}
                outerRadius={40}
            />
            <Pie
                dataKey={'value'}
                cx={100}
                cy={100}
                data={data}
                innerRadius={40}
                outerRadius={80}
            >{data.map((entry, index) => <Cell key={'storage-'+index} fill={COLORS[index % COLORS.length]}/>)}</Pie>
            <Tooltip/>
            <Legend layout={'vertical'} align={'right'}/>
        </PieChart>
    );
}

export default StoragePieChart;