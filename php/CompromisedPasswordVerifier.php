<?php
class CompromisedPasswordVerifier {
    public static function isCompromised(string $password): int {
        $hash = \strtoupper(\hash('sha1', $password));
        $hashSearch = \substr($hash, 0, 5);

        $response = \file_get_contents("https://api.pwnedpasswords.com/range/{$hashSearch}");
        foreach(\preg_split('/\r?\n/', $response) as $hashDataFromServer) {
            list($hashSuffixFromServer, $timesDataset) = \explode(':', \trim($hashDataFromServer));
            if ($hash == "{$hashSearch}{$hashSuffixFromServer}") {
                return (int)$timesDataset;
            }
        }
        return 0;
    }
}
var_dump(CompromisedPasswordVerifier::isCompromised('password'));
var_dump(CompromisedPasswordVerifier::isCompromised('password123'));
var_dump(CompromisedPasswordVerifier::isCompromised('senha'));
var_dump(CompromisedPasswordVerifier::isCompromised('whey'));
var_dump(CompromisedPasswordVerifier::isCompromised('SenhaMuitoDificil10fdfjdsa0f9023412312'));

