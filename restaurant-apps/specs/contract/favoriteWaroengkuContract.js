const itActsAsFavoriteWaroengkuModel = (favoriteWaroengku) => {
    it('should return the waroengku that has been added', async () => {
        favoriteWaroengku.putWaroengku({ id: 1 });
        favoriteWaroengku.putWaroengku({ id: 2 });

        expect(await favoriteWaroengku.getWaroengku(1))
            .toEqual({ id: 1 });
        expect(await favoriteWaroengku.getWaroengku(2))
            .toEqual({ id: 2 });
        expect(await favoriteWaroengku.getWaroengku(3))
            .toEqual(undefined);
    });

    it('should refuse a waroengku from being added if it does not have the correct property', async () => {
        favoriteWaroengku.putWaroengku({ aProperty: 'property' });
        expect(await favoriteWaroengku.getAllWaroengku())
            .toEqual([]);
    });

    it('can return all of the waroengku that have been added', async () => {
        favoriteWaroengku.putWaroengku({ id: 1 });
        favoriteWaroengku.putWaroengku({ id: 2 });

        expect(await favoriteWaroengku.getAllWaroengku())
            .toEqual([
                { id: 1 },
                { id: 2 },
            ]);
    });

    it('should remove favorite waroengku', async () => {
        favoriteWaroengku.putWaroengku({ id: 1 });
        favoriteWaroengku.putWaroengku({ id: 2 });
        favoriteWaroengku.putWaroengku({ id: 3 });

        await favoriteWaroengku.deleteWaroengku(1);
        expect(await favoriteWaroengku.getAllWaroengku())
            .toEqual([
                { id: 1 },
                { id: 2 },
            ]);
    });

    it('should handle request to remove a waroengku even though the waroengku has not been added', async () => {
        favoriteWaroengku.putWaroengku({ id: 1 });
        favoriteWaroengku.putWaroengku({ id: 2 });
        favoriteWaroengku.putWaroengku({ id: 3 });

        await favoriteWaroengku.deleteWaroengku(4);
        expect(await favoriteWaroengku.getAllWaroengku())
            .toEqual([
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ]);
    });

    it('should be able to search for waroengku', async () => {
        favoriteWaroengku.putWaroengku({ id: 1, title: 'waroengku a' });
        favoriteWaroengku.putWaroengku({ id: 2, title: 'waroengku b' });
        favoriteWaroengku.putWaroengku({ id: 3, title: 'waroengku abc' });
        favoriteWaroengku.putWaroengku({ id: 4, title: 'ini waroengku abcd' });

        expect(await favoriteWaroengku.searchWaroengku('waroengku a')).toEqual([
            { id: 1, title: 'waroengku a' },
            { id: 3, title: 'waroengku abc' },
            { id: 4, title: 'ini waroengku abcd' },
        ]);
    });
};

export { itActsAsFavoriteWaroengkuModel };
