package com.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.myapp.web.rest.TestUtil;

public class PayedTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Payed.class);
        Payed payed1 = new Payed();
        payed1.setId(1L);
        Payed payed2 = new Payed();
        payed2.setId(payed1.getId());
        assertThat(payed1).isEqualTo(payed2);
        payed2.setId(2L);
        assertThat(payed1).isNotEqualTo(payed2);
        payed1.setId(null);
        assertThat(payed1).isNotEqualTo(payed2);
    }
}
