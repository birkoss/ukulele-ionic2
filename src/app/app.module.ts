import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { ChordsTabs } from '../pages/chords/tabs/tabs';
import { ChordsDetailPage } from '../pages/chords/detail';
import { ChordsListPage } from '../pages/chords/list';
import { ChordsFavoritesPage } from '../pages/chords/favorites/favorites';
import { ChordsQuizPage } from '../pages/chords/quiz/quiz';

import { ChordsFiltersPopover } from '../pages/chords/popovers/chords-filters';
import { ChordsOptionsPopover } from '../pages/chords/popovers/chords-options';
import { DetailOptionsPopover } from '../pages/chords/popovers/detail-options';

import { ChordCard } from '../components/chord-card/chord-card';
import { ChordName } from '../components/chord-name/chord-name';
import { ChordPosition } from '../components/chord-position/chord-position';
import { MusicalNote } from '../components/musical-note/musical-note';
import { NoteName } from '../components/note-name/note-name';

import { ConfigProvider } from '../providers/config-provider';
import { DataProvider } from '../providers/data-provider';
import { FavoritesProvider } from '../providers/favorites-provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChordsTabs,
    ChordsDetailPage,
    ChordsListPage,
    ChordsFavoritesPage,
    ChordsQuizPage,
    MusicalNote,
    ChordPosition,
    NoteName,
    ChordName,
    ChordCard,
    ChordsFiltersPopover,
    ChordsOptionsPopover,
    DetailOptionsPopover,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChordsTabs,
    ChordsDetailPage,
    ChordsListPage,
    ChordsFavoritesPage,
    ChordsQuizPage,
    MusicalNote,
    ChordPosition,
    NoteName,
    ChordName,
    ChordCard,
    ChordsFiltersPopover,
    ChordsOptionsPopover,
    DetailOptionsPopover,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    ConfigProvider,
    DataProvider,
    FavoritesProvider,
  ]
})
export class AppModule {}
