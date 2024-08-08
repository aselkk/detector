import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FileUploadService } from '../../services/file-upload.service'
import { ReactiveFormsModule } from '@angular/forms'
import { CompareResultComponent } from '../../components/compare-result/compare-result.component'

@Component({
  selector: 'app-file-upload',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CompareResultComponent],
})
export class FileUploadComponent {
  selectedFile: File | null = null
  uploadedImages: any[] = []
  token =
    'ya29.a0AcM612zBdGMxiyFr2u6PEPGf744HazmD8D96P6OVSz8_llvpMHwJwI8vJe5XOCwpUTJA2zmNBnrKftgelfBVM8Dl5B9-yKioGJ91aF0PltaV-0uBYeQ90It1gDkHksOYFUOQ0mk_KpBTcZsF1p5w1FBLkxDI90TKQtmDaCgYKAVoSARISFQHGX2MiSEXZIptC2RO2YFmaGJDzoA0171'

  uploadForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService
  ) {
    this.uploadForm = this.formBuilder.group({
      username: ['', Validators.required],
      team: ['', Validators.required],
      token: [this.token],
    })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.selectedFile) {
      const formData = { ...this.uploadForm.value, token: this.token }

      this.fileUploadService
        .uploadFile(this.selectedFile, formData)
        .subscribe((response) => {
          this.uploadedImages.push({
            url: URL.createObjectURL(this.selectedFile!),
            meta: { ...formData },
          })
        })
      console.log(this.uploadedImages)
    } else {
      alert('Please fill in all metadata fields and select a file.')
    }
  }
}
