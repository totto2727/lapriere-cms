import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from "../../../models/question-base";
import { FormGroup } from "@angular/forms";
import { st } from '@angular/core/src/render3';
import { FormService} from '../../../services/form.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @Input()
  question: QuestionBase<any>;
  @Input()
  form: FormGroup;

  columnOptions: any;
  layoutColumnOptionsWidth = 300;
  layoutColumnOptionsHeight = 30;
  content = 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.';
  start: number;
  end: number;
  constructor(public formService:FormService ) {}

  ngOnInit() {
    console.log('layout ques', this.question);
    // console.log('layout question', this.question);
    // console.log('layout formGroup', this.form);
    this.loadLayoutColumnOptions();
    this.processRows();
  }

  processRows() {
    this.formService.layout = {};
    this.formService.layout.rows = [];

    let column = { class: "col" };

    let row = { class: "row", columns: [column, column] };
    this.formService.layout.rows.push(row);
    this.formService.layout.rows.push(row);

    this.processBlocks();

    console.log('layout', this.formService.layout)
  }

  loadLayoutColumnOptions() {
    this.columnOptions = [];
    this.columnOptions.push(['col']);
    this.columnOptions.push(['col-6', 'col-6']);
    this.columnOptions.push(['col-4', 'col-4', 'col-4']);
    this.columnOptions.push(['col-3', 'col-3', 'col-3', 'col-3']);
    this.columnOptions.push(['col-3', 'col-9']);
    this.columnOptions.push(['col-4', 'col-8']);
    this.columnOptions.push(['col-9', 'col-3']);
    this.columnOptions.push(['col-8', 'col-4']);
  }

  addRow(columnsToAdd) {
    console.log('columnsToAdd', columnsToAdd);
  }

  processBlocks(){
    let blocks = [];
    let block = {blockId : '1234-1234', propX : 'ipsum' };
    blocks.push(block);
    this.formService.layout.rows[0].columns[0].blocks = blocks;
  }

  onSelect(start, end) {
    console.log(start, end);
    this.start = start;
    this.end = end;
  }

  wrapTag(tag) {
    let last = this.content.substr(this.end);
    let toBeWrapped = this.content.substr(this.start, this.end - this.start);
    let first = this.content.substr(0, this.start);
    this.content = first + `<${tag}>` + toBeWrapped + `</${tag}>` + last;
  }

  insert(tag) {
    let last = this.content.substr(this.end);
    let toBeWrapped = this.content.substr(this.start, this.end - this.start);
    let first = this.content.substr(0, this.start);
    this.content = first + `${tag}` + toBeWrapped + last;
  }

}
