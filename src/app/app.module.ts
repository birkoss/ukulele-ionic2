import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { ChordsTabs } from '../pages/chords/tabs/tabs';
import { ChordsListPage } from '../pages/chords/list';
import { ChordsFavoritesPage } from '../pages/chords/favorites/favorites';
import { ChordsQuizPage } from '../pages/chords/quiz/quiz';

import { ChordsFiltersPopover } from '../pages/chords/popovers/chords-filters';

import { MusicalNote } from '../components/musical-note/musical-note';
import { ChordPosition } from '../components/chord-position/chord-position';

import { DataProvider } from '../providers/data-provider';
import { ConfigProvider } from '../providers/config-provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChordsTabs,
    ChordsListPage,
    ChordsFavoritesPage,
    ChordsQuizPage,
    MusicalNote,
    ChordPosition,
    ChordsFiltersPopover,
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
    MusicalNote,
    ChordPosition,
    ChordsFiltersPopover,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    DataProvider,
    ConfigProvider
  ]
})
export class AppModule {}
