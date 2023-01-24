const translations = {
  auth: {
    userName: 'Profil',
    signOut: 'Wyloguj się',
  },
  spinner: {
    loading: 'Ładowanie...',
  },
  datePicker: {
    selectMonth: 'Wybierz miesiąc',
  },
  navigation: {
    bar: {
      title: 'Vateusz',
    },
    pages: {
      home: 'Dodaj plik',
      invoices: 'Faktury',
    },
  },
  invoice: {
    table: {
      headers: {
        id: '#',
        name: 'Nazwa pliku',
        lastUpdated: 'Dodano',
        fileSize: 'Rozmiar',
        actions: 'Akcje',
      },
      actions: {
        download: 'Pobierz',
        rename: 'Zmień nazwę',
        remove: 'Usuń',
      },
    },
    rename: {
      title: 'Zmień nazwę pliku',
      description: 'Podaj nową nazwę pliku',
      close: 'Anuluj',
      save: 'Zapisz',
      availability: 'Nazwa jest już zajęta',
    },
    remove: {
      title: 'Potwierdź usunięcie',
      description: 'Czy na pewno chcesz trwale usunąc ten plik?',
      close: 'Odłóż',
      ok: 'Wyrzuć',
    },
  },
};

export default translations;
