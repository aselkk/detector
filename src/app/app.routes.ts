import { Routes } from '@angular/router'
import { FileUploadComponent } from './pages/upload-page/upload-page.component'
import { ComparePageComponent } from './pages/compare-page/compare-page.component'

export const routes: Routes = [
  {
    path: 'upload',
    component: FileUploadComponent,
  },
  {
    path: 'compare',
    component: ComparePageComponent,
  },
]
