import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { ChordsTabs } from '../pages/chords-tabs/chords-tabs';
import { ChordsDetailPage } from '../pages/chords-detail/chords-detail';
import { ChordsFavoritesPage } from '../pages/chords-favorites/chords-favorites';
import { ChordsListPage } from '../pages/chords-list/chords-list';
import { ChordsQuizPage } from '../pages/chords-quiz/chords-quiz';

import { NotesTabs } from '../pages/notes-tabs/notes-tabs';
import { NotesListPage } from '../pages/notes-list/notes-list';
import { NotesDetailPage } from '../pages/notes-detail/notes-detail';
import { NotesFavoritesPage } from '../pages/notes-favorites/notes-favorites';
import { NotesQuizPage } from '../pages/notes-quiz/notes-quiz';

import { ScalesListPage } from '../pages/scales-list/scales-list';

import { ChordsFiltersPopover } from '../popovers/chords-filters/chords-filters';
import { NotesFiltersPopover } from '../popovers/notes-filters/notes-filters';
import { ChordsOptionsPopover } from '../popovers/chords-options/chords-options';
import { DetailOptionsPopover } from '../popovers/detail-options/detail-options';
import { GeneralPopover } from '../popovers/general/general';

import { ChordsQuizModal } from '../modals/chords-quiz/chords-quiz';
import { NotesQuizModal } from '../modals/notes-quiz/notes-quiz';
import { ScalesFiltersModal } from '../modals/scales-filters/scales-filters';
import { NotesFiltersModal } from '../modals/notes-filters/notes-filters';

import { ChordCard } from '../components/chord-card/chord-card';
import { NoteCard } from '../components/note-card/note-card';
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
    NotesTabs,

    ChordsDetailPage,
    ChordsListPage,
    ChordsFavoritesPage,
    ChordsQuizPage,

    NotesDetailPage,
    NotesListPage,
    NotesFavoritesPage,
    NotesQuizPage,

    ScalesListPage,

    MusicalNote,
    ChordPosition,
    NoteName,
    ChordName,
    ChordCard,
    NoteCard,

    ChordsFiltersPopover,
    NotesFiltersPopover,
    ChordsOptionsPopover,
    DetailOptionsPopover,
    GeneralPopover,

    ChordsQuizModal,
    NotesQuizModal,
    ScalesFiltersModal,
    NotesFiltersModal,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    ChordsTabs,
    NotesTabs,

    ChordsDetailPage,
    ChordsListPage,
    ChordsFavoritesPage,
    ChordsQuizPage,

    NotesListPage,
    NotesDetailPage,
    NotesFavoritesPage,
    NotesQuizPage,

    ScalesListPage,

    MusicalNote,
    ChordPosition,
    NoteName,
    ChordName,
    ChordCard,
    NoteCard,

    ChordsFiltersPopover,
    NotesFiltersPopover,
    ChordsOptionsPopover,
    DetailOptionsPopover,
    GeneralPopover,

    ChordsQuizModal,
    NotesQuizModal,
    ScalesFiltersModal,
    NotesFiltersModal,
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
