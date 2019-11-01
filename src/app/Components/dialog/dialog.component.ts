import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  identifier: string;
  dataFromParent: object;
  dataToSendBack;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    // this.dataFromParent = data;
    if (data.identifier === 'Address'){
      console.log('Address');
      this.identifier = 'Address';
      this.dataFromParent = data;
    }
   }

  ngOnInit() {

  }


  closeDialog(){ 
    this.dialogRef.close({event:'close'}); 
    // this.dialogRef.close({event:'close',data:this.fromDialog}); 
  }

}
