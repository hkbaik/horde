import React from 'react';
import { connect } from 'react-redux';
import TreeMap from "react-d3-treemap";
import "react-d3-treemap/dist/react.d3.treemap.css";

const TreemapOverview = ({isFetching, numOfNodes, totalAllocated, totalAvailable, parents}) => {

    return (
        <div>
            { isFetching && parents.children.length === 0 &&
                <h2>Loading...</h2>
            }
            { parents.children.length > 0 &&
                <TreeMap
                    height={1000}
                    width={1000}
                    data={parents}
                    valueUnit={"Byte"}
                />
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {

    if( state.directory.storages.length === 0) {
        return {
            isFetching: state.directory.isFetching,
            numOfNodes: 0,
            totalAllocated: 0,
            totalAvailable: 0,
            parents: { name: 'Orc Network', children: [] }
        } 
    }

    const stat = state.directory.storages.reduce((acc, storage) => {
        acc.numOfNodes += 1;
        acc.totalAllocated += storage.capacity.allocated;
        acc.totalAvailable += storage.capacity.available;
        const node = {
            xpub: storage.contact[1].xpub,
            name: storage.contact[0],
            children: [
                { name: "Used", value: (storage.capacity.allocated - storage.capacity.available) },
                { name: "Available", value: storage.capacity.available}
            ]
        };
        if(acc.totalAllocated === 0) {
            acc.parents[node.xpub] = { name: node.xpub, children: [node] }
        } else {
            if (acc.parents[node.xpub]) {
                acc.parents[node.xpub].children.push(node);
            } else {
                acc.parents[node.xpub] = { name: node.xpub, children: [node] };
            }
        }

        return acc;
    }, {
        isFetching: state.directory.isFetching,
        numOfNodes: 0,
        totalAllocated: 0,
        totalAvailable: 0,
        parents: {}
    });

    return {
        isFetching: state.directory.isFetching,
        numOfNodes: stat.numOfNodes,
        totalAllocated: stat.totalAllocated,
        totalAvailable: stat.totalAvailable,
        parents: { name: 'Orc Network', children: Object.keys(stat.parents).map((key) => { return stat.parents[key]; }) }
    }
}

export default connect(mapStateToProps)(TreemapOverview);