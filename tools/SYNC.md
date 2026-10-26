# Синхронизация: папка на ПК (Яндекс Диск) ⇄ сайт (GitHub)

Папка на ПК: `E:\_Давыдов\Yandex.Disk\Документы\Шевроны\Программа шеврон\`
Репозиторий: `davidov-s/kollekciya-shevronov` (ветка main), сайт — GitHub Pages.
База последней синхронизации: коммит, записанный в `.sync/base` (его `data/collection.js` = общее состояние ПК и сайта на момент синхронизации).

## Порядок
1. Подключить репозиторий с правом записи (add_repo davidov-s/kollekciya-shevronov, access push), склонировать или обновить в `/home/claude/kollekciya-shevronov`.
2. Через инструменты компьютера (remote-devices) проверить, что ПК доступен. Если нет — завершить с короткой пометкой «ПК недоступен, синхронизация пропущена».
3. Скопировать с ПК `data\collection.js` (device_stage_files, запомнить mtimeMs).
4. `git show $(cat .sync/base):data/collection.js > /tmp/sync/base.js`; сайт = `data/collection.js` из репозитория.
5. `node tools/sync.js /tmp/sync/base.js <ПК> data/collection.js /tmp/sync/out.js /tmp/sync/rep.json`.
6. Фото и PDF: для каждого пути из `rep.photos` и `rep.files`:
   - есть в репозитории, нет на ПК → записать на ПК (device_commit_files, не больше ~12 файлов за вызов, stagedPath под /mnt/user-data/outputs/);
   - есть на ПК, нет в репозитории → забрать с ПК (device_stage_files) и добавить в репозиторий.
7. Если `rep.toGitHub` или добавлены файлы: `cp /tmp/sync/out.js data/collection.js`, коммит от имени davidov-s «Синхронизация с ПК (дата)», push.
8. Если `rep.toPC`: сначала записать текущую версию с ПК в `data\backup\collection-<дата>-pered-sinhr.js`, затем записать out.js в `data\collection.js` с expectedMtimeMs из шага 3 (если отклонено из-за изменения файла — повторить с шага 3 один раз).
9. Записать в `.sync/base` SHA коммита, в котором `data/collection.js` совпадает с out.js (текущий HEAD после шага 7), коммит «Синхронизация: база» и push.
10. Если в `rep.conflicts` есть записи — сохранить отчёт на ПК в `data\backup\konflikty-<дата>.json` (в конфликте оставлена версия сайта, версия с ПК — в отчёте).
11. Итог — 1–3 предложения по-русски: что ушло на сайт, что пришло на ПК, конфликты. Если изменений нет — одно предложение «Изменений нет».

Никогда не удалять файлы на ПК и в репозитории, кроме случая, когда знак удалён в каталоге (тогда его фото просто остаётся неиспользованным).
