import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-facets',
    templateUrl: './facets.component.html',
    styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
    @Input() categories: any;
    treeStructure: any[];
    constructor() { }

    ngOnInit(): void {
        this.treeStructure = this.generateTreeStructure();
    }

    generateTreeStructure() {
        const indexed = this.categories.reduce((res, item) => {
            res[item.id] = item;
            return res;
        }, {});

        console.log(indexed)

        // retain the root items only
        const result = this.categories.filter((item) => {

        // get parent
        const parent = indexed[item.parent];

        // has parent?
        if (parent) {
            // add item as a child
            parent.collapsed = true;
            parent.children = (parent.children || []).concat(item);
        }

        // This part determines if the item is a root item or not
        return !parent;
        });
        return (result);
    }

    toggleCollapsed(item) {
        item.collapsed = !item.collapsed;
    }

}
