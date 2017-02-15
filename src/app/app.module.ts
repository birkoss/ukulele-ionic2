import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { ChordsTabs } from '../pages/chords/tabs/tabs';
import { ChordsListPage } from '../pages/chords/list/list';
import { ChordsFavoritesPage } from '../pages/chords/favorites/favorites';
import { ChordsQuizPage } from '../pages/chords/quiz/quiz';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChordsTabs,
    ChordsListPage,
    ChordsFavoritesPage,
    ChordsQuizPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChordsTabs,
    ChordsListPage,
    ChordsFavoritesPage,
    ChordsQuizPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
