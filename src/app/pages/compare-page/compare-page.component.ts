import { Component } from '@angular/core'
import { FileCompareService } from '../../services/file-compare.service'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms'
import { CompareResultComponent } from '../../components/compare-result/compare-result.component'

@Component({
  selector: 'app-compare-page',
  standalone: true,
  imports: [ReactiveFormsModule, CompareResultComponent],
  templateUrl: './compare-page.component.html',
  styleUrl: './compare-page.component.scss',
})
export class ComparePageComponent {
  loading = false
  boxes: number[][] = []
  names: string[] = []
  imageUrl: string = ''
  selectedFile: File | null = null
  uploadedImages: any[] = []
  token =
    'ya29.a0AcM612zBdGMxiyFr2u6PEPGf744HazmD8D96P6OVSz8_llvpMHwJwI8vJe5XOCwpUTJA2zmNBnrKftgelfBVM8Dl5B9-yKioGJ91aF0PltaV-0uBYeQ90It1gDkHksOYFUOQ0mk_KpBTcZsF1p5w1FBLkxDI90TKQtmDaCgYKAVoSARISFQHGX2MiSEXZIptC2RO2YFmaGJDzoA0171'

  uploadForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private fileCompareService: FileCompareService
  ) {
    this.uploadForm = this.formBuilder.group({
      usernames: this.formBuilder.array([this.createUsernameControl()]),
      team: ['', Validators.required],
      token: [this.token],
    })
  }

  get usernames() {
    return this.uploadForm.get('usernames') as FormArray
  }

  createUsernameControl(): FormControl {
    return this.formBuilder.control('', Validators.required)
  }

  addUsername(): void {
    this.usernames.push(this.createUsernameControl())
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.selectedFile) {
      this.loading = true
      const formData = {
        usernames: this.uploadForm.value.usernames,
        team: this.uploadForm.value.team,
        token: this.token,
      }

      this.fileCompareService.uploadFile(this.selectedFile, formData).subscribe(
        (response) => {
          this.uploadedImages.push({
            url: URL.createObjectURL(this.selectedFile!),
            meta: { ...formData },
          })
          this.loading = false
          this.boxes = response.boxes
          this.names = response.names
          this.imageUrl = URL.createObjectURL(this.selectedFile!)
        },
        (error) => {
          this.loading = false
          console.error('Upload failed:', error)
        }
      )
      console.log(this.imageUrl, this.boxes, this.names)
      console.log(this.uploadedImages)
    } else {
      alert('Please fill in all metadata fields and select a file.')
    }
  }
}
