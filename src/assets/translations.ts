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
      toggleAriaLabel: '',
      offcanvasAriaLabel: '',
    },
    pages: {
      upload: 'Dodaj plik',
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
      buttons: {
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
  upload: {
    title: 'Prześlij lub upuść plik tutaj',
    hoverTitle: 'Upuść tutaj',
    errors: {
      maxSize: 'Zbyt duży rozmiar pliku',
    },
  },
  admin: {
    title: 'Wybierz użytkownika z listy',
    tip: 'Nastepnie przejdź do zakładki Pliki',
    selected: 'Aktualnie wybrany użytkownik',
    empty: 'Brak użytkowników do wyświetlenia',
  },
  calculator: {
    title: 'Kalkulator miniratki',
    rate: 'Oprocentowanie kredytu (%)',
    times: 'Liczba pozostałych rat',
    presentValue: 'Pozostała kwota do spłaty (zł)',
    result: 'Twoja miniratka: ',
  },
};

export default translations;
