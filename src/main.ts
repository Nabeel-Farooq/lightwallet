import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

async function bootstrap(): Promise<void> {
  try {
    await platformBrowserDynamic().bootstrapModule(AppModule)
  } catch (error) {
    console.error('Failed to bootstrap Angular application:', error)
  }
}

void bootstrap()
