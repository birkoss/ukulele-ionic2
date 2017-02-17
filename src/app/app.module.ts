import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { ChordsTabs } from '../pages/chords/tabs/tabs';
import { ChordsListPage } from '../pages/chords/list/list';
import { ChordsFavoritesPage } from '../pages/chords/favorites/favorites';
import { ChordsQuizPage } from '../pages/chords/quiz/quiz';

import { MusicalNote } from '../components/musical-note/musical-note';

import { DataProvider } from '../providers/data-provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChordsTabs,
    ChordsListPage,
    ChordsFavoritesPage,
    ChordsQuizPage,
    MusicalNote,
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
    ChordsQuizPage,
    MusicalNote
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
