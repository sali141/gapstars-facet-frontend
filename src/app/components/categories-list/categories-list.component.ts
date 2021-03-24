import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
    @Input() categories: any[];
    @Output() toggleSelect = new EventEmitter<boolean>();
    constructor() { }

    ngOnInit(): void {
    }

    toggleCollapsed(item) {
        item.collapsed = !item.collapsed;
    }

    onToggleSelect() {
        this.toggleSelect.emit(true);
    }

    selectAll(event, category) {
        category.children.forEach(obj => {
            obj.isSelected = event.target.checked;

            if (!obj.collapsed && obj.children && obj.children.length > 0) {
                obj.selectAll = event.target.checked;
                this.selectAll(event, obj);
            }
        });
    }
}
