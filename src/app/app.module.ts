import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { ChordsTabs } from '../pages/chords-tabs/chords-tabs';
import { ChordsDetailPage } from '../pages/chords-detail/chords-detail';
import { ChordsFavoritesPage } from '../pages/chords-favorites/chords-favorites';
import { ChordsListPage } from '../pages/chords-list/chords-list';
import { ChordsQuizPage } from '../pages/chords-quiz/chords-quiz';
import { LoadingPage } from '../pages/loading/loading';

import { ChordsFiltersPopover } from '../popovers/chords-filters/chords-filters';
import { ChordsOptionsPopover } from '../popovers/chords-options/chords-options';
import { ChordsQuizFiltersPopover } from '../popovers/chords-quiz-filters/chords-quiz-filters';
import { DetailOptionsPopover } from '../popovers/detail-options/detail-options';

import { ChordsQuizModal } from '../modals/chords-quiz/chords-quiz';

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

    ChordsTabs,

    ChordsDetailPage,
    ChordsListPage,
    ChordsFavoritesPage,
    ChordsQuizPage,
    LoadingPage,

    MusicalNote,
    ChordPosition,
    NoteName,
    ChordName,
    ChordCard,

    ChordsFiltersPopover,
    ChordsQuizFiltersPopover,
    ChordsOptionsPopover,
    DetailOptionsPopover,

    ChordsQuizModal,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    ChordsTabs,

    ChordsDetailPage,
    ChordsListPage,
    ChordsFavoritesPage,
    ChordsQuizPage,
    LoadingPage,

    MusicalNote,
    ChordPosition,
    NoteName,
    ChordName,
    ChordCard,

    ChordsFiltersPopover,
    ChordsQuizFiltersPopover,
    ChordsOptionsPopover,
    DetailOptionsPopover,

    ChordsQuizModal,
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
