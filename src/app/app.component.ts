import { Component } from '@angular/core';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { environment } from 'src/environments/environment';
import * as Editor from '@app/../src/assets/ngClassicEditor/build/ckeditor.js';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import EditorClass from '@ckeditor/ckeditor5-build-classic';
import ClassOne from '@ckeditor/ckeditor5-build-balloon';
import ClassTwo from '@ckeditor/ckeditor5-build-balloon-block';

export class UploadAdapter {
  private loader;
  constructor( loader ) {
     this.loader = loader;
  }

  upload() {
     return this.loader.file
           .then( file => new Promise( ( resolve, reject ) => {
                 // tslint:disable-next-line:prefer-const
                 let myReader = new FileReader();
                 myReader.onloadend = (e) => {
                    resolve({ default: myReader.result });
                 };

                 myReader.readAsDataURL(file);
           } ) );
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Angular';
  editor = DecoupledEditor;
  data: any = `<p>Hello, world!</p>`;


  public onReady( editor ) {
    editor.plugins.get('FileRepository').createUploadAdapter =  (loader => {
          console.log('loader : ', loader);
          console.log(btoa(loader.file));
          return new UploadAdapter(loader);
    });
    editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element
    );
}
